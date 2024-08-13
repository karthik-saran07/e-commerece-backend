const {getAllUser, createUser, updateUser, deleteUser, userLogin} = require('../Controller/userController.js') //we import all method names from controller
const express = require('express')
const route = express.Router();

route.post("/createUser", createUser);      //we are posting new data into our database
route.get("/getAllUser", getAllUser);       //we are retrieving all existing users from database
route.post("/updateUser", updateUser);      //we are updating the existing users only
route.delete("/deleteUser", deleteUser);    //we are deleting the existing user by their email only
route.post("/userLogin", userLogin)         //if user exists, he can login and checks for correct password

module.exports = route;