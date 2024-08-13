const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const userRoute = require('./Routes/userRoute.js')
const productRoute = require('./Routes/productRoute.js')
const cartRoute = require('./Routes/cartRoute.js')
const orderRoute = require('./Routes/orderRoute.js')
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors())

const PORT = process.env.PORT;  //using .env file we get sensitive data
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
    .then(()=>
    {
        console.log("Database connected !!");
        app.listen(PORT, ()=>
        {
            console.log(`Server running in port ${PORT}`);
        })  
    })
    .catch((error)=>
    {
        console.log(error);
    });

app.use("/api/user", userRoute)         //only for users
app.use("/api/product", productRoute)   //only for products
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)