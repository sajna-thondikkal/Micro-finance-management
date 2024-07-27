const Loan = require('../models/loans');


// see all loans
async function getAllLoans(){
    try {
        const allLoans = await Loan.find().populate('user_name');
        const formattedAllLoans = allLoans.map(loans =>({
            loan_id:loans.id,
            loan_date:loans.date,
            user_name:loans.user_name.user_name,
            loan_amount:loans.loan_amount
        }))
        return formattedAllLoans;
    } catch (error) {
        throw error;
    }
}

// see loan details by id
async function getLoanById(id){
    try {
        const loan = await Loan.findById(id);
        return loan;
    } catch (error) {
        throw error;
    }
}

// check existance of id in a table to check user has previous loan
async function existId(user_name){
    try {
        const exist = Loan.exists({user_name:user_name});
        console.log("exist",exist);
        return exist;
    } catch (error) {
        throw error;
    }
}

// make a loan or apply for a loan
async function makeLoan(loan_obj){
    try {
        const makeloan = await Loan.create(loan_obj);
        return makeloan;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllLoans,
    getLoanById,
    existId,
    makeLoan
}