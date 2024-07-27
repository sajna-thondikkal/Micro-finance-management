const loanRepositories = require('../repositories/loans');
const depositeRepository = require('../repositories/deposites');
const depositeServices = require('../services/deposites');
const asyncHandler = require('../middlewares/asyncHandler');
const loanService = require('../services/loans')

// see all loans
const getAllLoans = asyncHandler(async(req,res,next)=>{
    const allLoans = await loanRepositories.getAllLoans();
    if(allLoans && allLoans.length > 0){
        const total_Loan = loanService.totalLoan(allLoans);
        return res.status(200).json({"Message":"All loans details are","Data":allLoans,"Total Loan":total_Loan});
    }
    res.status(404).json({"Message":"No loans found"});
})

// get loan by id
const getLoanById = asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const loan = await loanRepositories.getLoanById(id);
    if(loan){
        res.status(200).json({"Message":"Loan details are","Data":loan});
    }
    else{
        res.status(404).json({"Message":"No Loans found"});
    }
})

// make loan
const makeLoan = asyncHandler(async(req,res,next)=>{
    const date = Date.now();
    const {user_name,loan_amount} = req.body;

    // get users total deposite
    const depositeByUser = await depositeRepository.getDepositeByName(user_name);
    const deposite = depositeServices.totalDepositeByUser(depositeByUser);

    // check conditions
    // check user has already a loan
    const exist = await loanRepositories.existId(user_name);
    if(exist){
        return res.status(200).json({"Message":"You has already a loan, so you are not eligible for loan"});
    }
    if((deposite * 4) >= loan_amount){
        const makeloan = await loanRepositories.makeLoan({date,user_name,loan_amount});
        res.status(200).json({"Message":`Congratulations,your loan has benn approved with amount of${loan_amount}`});
    }
    else{
        res.status(200).json({"Message":"Sorry,You have not enough deposite. Loan cannot be approved at this time.."});
    }
})

module.exports = {
    getAllLoans,
    getLoanById,
    makeLoan
}