const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const {v4 : uuidv4} = require('uuid')

const userSchema = new mongoose.Schema({
    u_id:{
        type :String,
        unique : true,
        default : uuidv4(),
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,unique:true,
    },

    password : {
        type: String,
        required : true
    }
})

userSchema.pre('save',async function(next) {
    try {
        console.log("email validate ");
        next();
    } catch (error) {
        
    }
    
})

userSchema.pre('save', async function (next) {
    if(!this.isModified("password"))
        return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword = async function(pass) {
    return await bcrypt.compare(pass, this.password)
}

const userModel = new mongoose.model('user', userSchema);

module.exports = userModel;