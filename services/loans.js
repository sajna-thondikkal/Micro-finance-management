
function totalLoan(loan_obj){
    total = 0;
    for(const item of loan_obj){
        total = total+item.loan_amount;
    }
    return total;
}

module.exports = {
    totalLoan
}