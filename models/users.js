const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    house_name:{
        required:true,
        type:String
    },
    place:{
        required:true,
        type:String
    }
})
const userSchema = new mongoose.Schema({
    user_name:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    user_role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    },
    address: addressSchema,
    phone:{
        required:true,
        type:Number
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;