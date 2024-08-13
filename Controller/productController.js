const productModel = require("../Model/productModel")

const getProduct = async (req, res) =>
{
    try {

        const productData = await productModel.find();
        if(!productData || productData.length === 0)
            return res.status(401).json({message : "empty product list !!" })
        return res.json({productData});
        
    } catch (error) {
        throw error;
    }
}

const createProduct = async (req, res) => 
{
    const { title, price, description, category, image, rating} = req.body;
    let product = new productModel(
        {
            title,
            price,
            description,
            category,
            image,
            rating : 
                {
                    rate : rating.rate,
                    count : rating.count
                }
            
        }
    )
    const productData = await product.save();
    res.status(201).json({message : "Product added to listing !!"});
    console.log(productData);
    
    
}

module.exports = { getProduct, createProduct}