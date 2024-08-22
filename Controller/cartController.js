const cartModel = require('../Model/cartModel.js');

const createOrUpdateCart = async (req, res) =>
{   
    try {
    console.log("inside Create/Update cart");   
    const {u_id} = req.user;
    const {productId, cartQuantity} = req.body;              //we get the parameter from cart model
    let cart = await cartModel.findOne({userId : u_id});    //we check if the current user already has an cart saved
    if(!cart) {                                      //if no cart, we create a new empty cart for the user

       try {

        cart = new cartModel({
            userId : u_id,
            product : [
               {
                productId,
                cartQuantity,
               }
            ]
        });
        console.log({cart});

        res.status(202).json({message : "New cart is added !!"})
        
       } catch (error) {
         console.log(error);
        
       }

    }
    else {

        const existingProduct = await cart.product.findIndex((p) => p.productId.toString() === productId)
        // console.log(existingProduct);
        
        
        if(existingProduct == -1)
        {
            cart.product.push({
                  productId,
                  cartQuantity
            });
            console.log("new prod");
            
             res.status(206).json({message : "New product is added to cart !!"});
        }
        else
        {

            cart.product[existingProduct].cartQuantity = cartQuantity;
            console.log("cart updated");
            res.status(205).json({message : "Cart is updated"});
        }
    }
    await cart.save();

    } catch (error) {
        throw error;
        
    }
    
}

const getCart = async (req, res) =>
{
    const {u_id} = req.user;

    const cart = await cartModel.findOne({userId : u_id})
    if(!cart)
        return res.status(401).json({message : "No cart found for the user !!"});
    return res.status(200).json({cart})

}

const deleteCartItem = async (req, res) => {
    const { u_id } = req.user;
    const userExist = await cartModel.findOne({userId : u_id})
    if(userExist) {
        const {productId} = req.body;
        console.log(productId);
        const newCart = await userExist.product.filter((p) => p.productId != productId )
        const updatedCart = await cartModel.findOneAndUpdate({userId : u_id}, {product : newCart})
        return res.status(200).json({message : "Product deleted from cart !!"})
    }
}

module.exports = {createOrUpdateCart, getCart, deleteCartItem}