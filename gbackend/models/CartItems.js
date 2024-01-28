const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartItemsSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    totalItems:{
        type:Number,
        required: true
    },
    totalPrice:{
        type:Number,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    productImageUrl:{
        type: String,
        required: true
    },
  });
  const CartItems = mongoose.model('cart', CartItemsSchema);
  module.exports = CartItems;