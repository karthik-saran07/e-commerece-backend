const mongoose = require('mongoose')
const {v4 : uuidv4} = require('uuid')

const productSchema = new mongoose.Schema({

    id : {
        type : String,
        unique : true,
        default : () => uuidv4()
    },
    title : {
        type : String,
        required : true
    },
    price :  {
        type : Number,
    },
    description :  {
        type : String,
    },
    category :  {
        type : String,
    },
    image :  {
        type : String,
    },
    rating : {
        rate : { type : Number },
        count : { type : Number },
    }
},)

const productModel = new mongoose.model('products', productSchema, "products");

module.exports = productModel;