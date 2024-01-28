const express = require('express');
const Adminlog = require('../models/Adminlog');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'SomeGibri$$h languaaageee';
// var fetchuser = require('../middleware/fetchUser');

router.post('/adminlogin', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

// If there are errors, return Bad request and the errors
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const { email, password } = req.body;
try {
    let admin = await Adminlog.findOne({ email });
    if (!admin) {
        return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, admin.password);
    if (!passwordCompare) {
        return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const data = {
        admin: {
            id: admin.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken })

} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
module.exports = router