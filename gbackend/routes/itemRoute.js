const express = require('express');
const Item = require('../models/Items');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/getallproducts',async(req,res)=>{
    try {
        
    let item=await Item.find();
    if(item){
        res.json({"items":item});
    }
    else{
        res.status(400).json({error:"No products to display"})
    }
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
}
})
router.post('/newproduct', [
    body('productName', 'Enter a valid Product Name').isLength({ min: 1 }),
    body('productPrice', 'Price cannot be empty').isNumeric(),
    body('productImageUrl', 'URL cannot be empty').isLength({ min: 1 }),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
        // Check whether the user with this email exists already
        let item = await Item.findOne({ productName: req.body.productName });
        if (item) {
            return res.status(400).json({ error: "Product already present in the database" })
        }

        // Create a new user
        item = await Item.create({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productImageUrl: req.body.productImageUrl,
        })
        res.json(item)
        
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

router.put('/updateproduct/:prodid', [
    body('productName', 'Enter a valid Product Name').isLength({ min: 1 }),
    body('productPrice', 'Price cannot be empty').isNumeric(),
    body('productImageUrl', 'URL cannot be empty').isLength({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {productName,productPrice,productImageUrl}=req.body
        let item = await Item.findOne({ _id: req.params.prodid});
        const objectIdAsString = item._id.toString();
        if(!item){
            return res.status(400).json({ error: "Product not in the database" })
        }
        const updateItem={};
        if (productName){updateItem.prodname=productName};
        if (productPrice){updateItem.productPrice=productPrice};
        if (productImageUrl){updateItem.productImageUrl=productImageUrl};
        item=await Item.findByIdAndUpdate(objectIdAsString,{$set:updateItem},{new:true})
        res.json(item);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

router.delete('/deleteitem/:prodid',async(req,res)=>{
    try{
        let item = await Item.findOne({ _id: req.params.prodid});
        const objectIdAsString = item._id.toString();
        if(!item){
            return res.status(400).json({ error: "Product not in the database" })
        }
        item=await Item.findByIdAndDelete(objectIdAsString);
        res.json({"Success":"Deleted successfully",item:item});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})
module.exports = router