const userModel = require('../Model/userModel.js');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) =>
{
    try {
        // console.log("Inside!!");
        
        const {name, email, password} = req.body;
        const checkUser = await userModel.findOne({email})
        if(checkUser)
            return res.status(404).json({message : "User already exists !!"});
        
        const savedUser = new userModel({
            name, 
            email,
            password
        })

        await savedUser.save();
        
        res.status(200).json({savedUser});          //postman output we send as json format

    } catch (error) {
        res.status(500).json({message : error})
    }
}

const getAllUser = async (req, res) =>
{
    try {
        
        const user = await userModel.find();    //gets all data from database
        if(user.lenght === 0)
            res.status(400).json({message : "no existing users"})
        res.status(200).json({user});   //postman output we send as json format

    } catch (error) {
        res.status(500).json({error:"Server error bruh !!"})
    }
}

const updateUser = async (req, res) =>
{
    try {
        

        // const userData = await new userModel(req.body);
        const {name, email, password} = req.body;
        const findUser = await userModel.findOne({email});
        if(!findUser)
            return res.status(401).json({message : "User must exist to update bruh !!" })
        
        findUser = {...findUser,name,password};
        const saveUser = await findUser.save();
        res.status(200).json({saveUser})

    } catch (error) {
        res.status(400).json({message : "Server error bruh !!" })
    }
}

    const deleteUser = async (req, res) =>
    {
        try {
            const {email} = req.body;
            const findUser = await userModel.findOne({email})
            if(!findUser)
                return res.status(401).json({message : "No user found to delete !!" })
            const deletedUser = await userModel.findOneAndDelete(
                {email}
            )
            if(!deletedUser)
                return res.status(401).json({message : "User is not deleted !!"})
            res.status(200).json({deletedUser});
        } catch (error) {
            res.status(401).json({message : "Server error bruh" })
        }
    }

const userLogin = async (req, res) =>
{
    try {
        
    const {email, password} = req.body;

    const user = await userModel.findOne({email});
    if(!user)
        return res.status(404).json({message : "Login failed, user does not exist !!" });

    const checkPassword = await user.comparePassword(password);
    if(!checkPassword)
        return res.status(404).json({message : "Password does not match bruh !!" });

    const token = jwt.sign({u_id : user.u_id}, '0',{
        expiresIn:'3h'
    })

    res.status(201).json({token, message : "Sucess"})

    } catch (error) {
        res.status(404).json({msg:"internal server error"})
    }
}


module.exports = {getAllUser, createUser, updateUser, deleteUser, userLogin}