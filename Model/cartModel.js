const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
    },
    cartQuantity : {
        type : Number,
    }
},{_id:false});

const cartSchema = new mongoose.Schema({
    userId : {
        type : String,
    },
    product : [productSchema]
})

const cartModel = new mongoose.model('cart', cartSchema, "cart")

module.exports = cartModel;