const mongoose = require('mongoose');

const depositeSchema = new mongoose.Schema({
    date:{
        required:true,
        type:Date
    },
    user_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    deposite_amount:{
        required:true,
        type:Number
    }
});

const Deposite = mongoose.model('Deposite',depositeSchema);

module.exports = Deposite;