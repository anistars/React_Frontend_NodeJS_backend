const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemsSchema = new Schema({
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
  const Item = mongoose.model('products', ItemsSchema);
  module.exports = Item;