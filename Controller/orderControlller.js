const orderModel = require('../Model/orderModel.js');
const cartModel = require('../Model/cartModel.js')

const createOrder = async (req, res) => {
    const {customer_address, customer_phone} = req.body;
    const {u_id} = req.user;

    try {
        const checkUser = await cartModel.findOne({userId: u_id});
        console.log(checkUser);
        
        if (checkUser) {
            

            const newOrder = new orderModel({
                order: [
                    {
                        customer_address,
                        customer_phone,
                        product: checkUser.product
                    }
                ]
            });

            await newOrder.save();
            res.status(200).json({message: "Order is placed from cart !!"});
        } else {
            res.status(404).json({message: "No cart found for the user"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
};

module.exports = createOrder;
