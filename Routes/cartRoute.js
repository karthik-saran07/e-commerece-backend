const express = require('express');
const auth = require('../Middleware/auth')
const { createOrUpdateCart, getCart, deleteCartItem } = require('../Controller/cartController');
const route = express.Router();

route.post("/createOrUpdateCart", auth, createOrUpdateCart);
route.get("/getCart", auth, getCart)
route.delete("/deleteCartItem", auth, deleteCartItem)

module.exports = route;