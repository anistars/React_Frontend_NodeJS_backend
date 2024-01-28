const express = require('express');
const Cart = require('../models/CartItems');
const Item = require('../models/Items');
const User = require('../models/Users');
const router = express.Router();
var fetchuser = require('../middleware/fetchUser');

router.get('/fetchAllCartItems', fetchuser, async (req, res) => {
    try {
        let cart = await Cart.find({ user: req.user.id });
        res.json({"cart":cart});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
})

router.post('/addItemsToCart/:prodname', fetchuser, async (req, res) => {
    try {

        const { totalItems } = req.body;
        let presentItem = await Item.findOne({ productName: req.params.prodname });
        let cartItem = await Cart.findOne({ productName: req.params.prodname,user:req.user.id });
        if (cartItem) {
            res.status(400).json({ error: "Product Already in cart" })
        }
        else if(totalItems==0){
            res.status(400).json({ error: "Enter valid no of items" })
        }
        else {
            console.log(req.user.id);
            const item = new Cart({
                user: req.user.id,
                productName: presentItem.productName,
                productPrice: presentItem.productPrice,
                productImageUrl: presentItem.productImageUrl,
                totalItems: totalItems,
                totalPrice: totalItems * presentItem.productPrice
            })
            const saveCart = await item.save();
            res.json({"cart":saveCart})
        }


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/updateitemcart/:prodname', fetchuser, async (req, res) => {
    const { totalItems } = req.body;
    try {
        let cartItem = await Cart.findOne({ productName: req.params.prodname,user:req.user.id  });
        let presentItem = await Item.findOne({ productName: req.params.prodname });
        const objectIdCart = cartItem._id.toString();
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        const objectIdUser = user._id.toString();
        if (cartItem) {
            if (totalItems == 0) {
                const result = await Cart.deleteOne({
                    "user": objectIdUser,
                    "_id": objectIdCart
                })
                res.json({ "Success": "Deleted Succesfully", result: result })
            }
            if (totalItems >= 1) {
                const result = await Cart.findOneAndUpdate({
                    "user": objectIdUser,
                    "_id": objectIdCart
                },
                {
                    $set: { "totalItems": totalItems, "totalPrice": presentItem.productPrice * totalItems }
                }
                )
                // let cartItem = await Cart.findOne({ productName: req.params.prodname,user:req.user.id });
                // console.log(cartItem);
                res.json({ "Success": "Updated Succesfully", result: result })
            }
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deleteitemcart/:prodname', fetchuser, async (req, res) => {
    try {
        let cartItem = await Cart.findOne({ productName: req.params.prodname,user:req.user.id  });
        const objectIdCart = cartItem._id.toString();
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        const objectIdUser = user._id.toString();
        console.log(objectIdCart, objectIdUser);
        if (cartItem && user) {
            const result = await Cart.deleteOne({
                "user": objectIdUser,
                "_id": objectIdCart
            })
            res.json({ "Success": "Deleted Succesfully", result: result })
        }
        else {
            res.status(400).json({ error: "Item not present" })
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router