const withdrawRepositories = require('../repositories/withdrawals');
const depositeRepositories = require('../repositories/deposites');
const depositeServices = require('../services/deposites');
const withdrawServices = require('../services/withdrawals');
const asyncHandler = require('../middlewares/asyncHandler');

// get all withdrawal details
const getAllWithdrawalDetails = asyncHandler(async(req,res,next)=>{
    const allDetails = await withdrawRepositories.getAllWithdrawalDetails();
    if(allDetails && allDetails.length > 0){
        // to find total amount of withdraw
        const totalWithdraw = withdrawServices.totalWithdrawal(allDetails);
        res.status(200).json({"Message":"All Withdrawals are","Withdrawal Data":allDetails,"Total Withdraw":totalWithdraw});
    }
    else{
        res.status(404).json({"Message":"No withdrawals to show"});
    }
})

// get withdrawal by id
const getWithdrawalById = asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const withdrawbyid = await withdrawRepositories.getWithdrawalById(id);
    if(withdrawbyid){
        res.status(200).json({"Message":"All withdrawals are","Data":withdrawbyid});
    }
    else{
        res.status(404).json({"Message":`No withdrawals to show for this id ${id}`});
    }
})

// get withdraw by name
const getWithdrawByName = asyncHandler(async(req,res,next)=>{
    const {user_name} = req.body;
    const withdrwName = await withdrawRepositories.getWithdrawByName(user_name);
    if(withdrwName){
        const totalwithdraw = withdrawServices.totalWithdrawal(withdrwName)
        res.status(200).json({"Message":"Your withdrawals are","Data":withdrwName,"Total Withdrawal":totalwithdraw});
    }
    else{
        res.status(404).json({"Message":"No withdrawals found for this user"});
    }
})

// make withdraw
const makeWithdraw = asyncHandler(async(req,res,next)=>{
    const date = Date.now();
    const {user_name,withdraw_amount} = req.body;
    // get all deposite by user
    const usersDeposite = await depositeRepositories.getDepositeByName(user_name);
    // get total deposite by user
    const totalDeposite = depositeServices.totalDepositeByUser(usersDeposite);

    if (totalDeposite > withdraw_amount) {
        const withdrawal = await withdrawRepositories.makeWithdraw({date,user_name,withdraw_amount});
        res.status(200).json({"Message":`You are withdrawed amount ${withdraw_amount}`});
    } else {
        res.status(404).json({"Message":"You have not enought deposite to make a withdrawal"});
    }
})

module.exports = {
    getAllWithdrawalDetails,
    getWithdrawalById,
    getWithdrawByName,
    makeWithdraw
}