const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
    date:{
        required:true,
        type:Date
    },
    user_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    withdraw_amount:{
        required:true,
        type:Number
    }
})

const Withdrawal = mongoose.model('Withdrawal',withdrawalSchema);

module.exports = Withdrawal;