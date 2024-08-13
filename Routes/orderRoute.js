const express = require('express');
const auth = require('../Middleware/auth');
const createOrder = require('../Controller/orderControlller');
const route = express.Router();

route.post("/createOrder", auth, createOrder)

module.exports = route;