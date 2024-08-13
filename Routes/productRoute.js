const express = require('express');
const route = express.Router();
const { getProduct, createProduct } = require('../Controller/productController');
const auth = require('../Middleware/auth');

route.get("/getProduct", auth, getProduct)
route.post("/createProduct",auth, createProduct)

module.exports = route