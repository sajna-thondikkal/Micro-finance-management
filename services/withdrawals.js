
// total withdraw

function totalWithdrawal(withdraw_obj){
    let withdraw = 0;
    for(const item of withdraw_obj){
        withdraw += item.withdraw_amount;
    }
    return withdraw;
}

module.exports = {
    totalWithdrawal
}