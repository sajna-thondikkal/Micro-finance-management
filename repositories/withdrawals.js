const Withdrawal = require('../models/withdrawals');


// get all withdrawal details
async function getAllWithdrawalDetails(){
    try {
        const allWithdrawal = await Withdrawal.find().populate('user_name');
        const formattedAllWithdrawal = allWithdrawal.map(withdrawal =>({
            withdrawal_id:withdrawal.id,
            user_name:withdrawal.user_name.user_name,
            date:withdrawal.date,
            withdraw_amount:withdrawal.withdraw_amount
        }))
        return formattedAllWithdrawal;
    } catch (error) {
        throw error;
    }
}
// get withdrawal details by id
async function getWithdrawalById(id){
    try {
        const withdrawal = await Withdrawal.findById(id);
        return withdrawal;
    } catch (error) {
        throw error;
    }
}

// get withdraw by name
async function getWithdrawByName(user_name){
    try {
        const withdrawName = await Withdrawal.find({user_name:user_name});
        return withdrawName;
    } catch (error) {
        throw error;
    }
}


// make a withdrawal
async function makeWithdraw(withdraw_obj){
    try {
        const withdraw = await Withdrawal.create(withdraw_obj);
        return withdraw;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllWithdrawalDetails,
    getWithdrawalById,
    getWithdrawByName,
    makeWithdraw
}