const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    date:{
        required:true,
        type:Date
    },
    user_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    loan_amount:{
        required:true,
        type:Number
    }
})

const Loan = mongoose.model('Loan',loanSchema);

module.exports = Loan;