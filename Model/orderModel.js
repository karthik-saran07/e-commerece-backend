const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    cartQuantity: {
        type: Number,
        required: true
    }
}, { _id: false }); // No separate _id for product objects

const branchOrderSchema = new mongoose.Schema({
    customer_address: {
        type: String,
        required: true
    },
    customer_phone: {
        type: Number,
        required: true
    },
    product: [productSchema], // Array of product objects
    order_time: {
        type: Date,
        default: Date.now()
    },
}, { _id: false }); // No separate _id for branchOrder objects

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        default: uuidv4
    },
    order: [branchOrderSchema] // Array of branch orders
});

const orderModel = mongoose.model('order', orderSchema, "orders");

module.exports = orderModel;
