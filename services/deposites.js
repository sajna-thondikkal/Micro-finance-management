
function totalDepositeByUser(deposite_obj){
    total = 0;
    for(const item of deposite_obj){
        total = total + item.deposite_amount;
    }
    return total;
}

function grandTotalDeposite(allDeposite_obj){
    gTotal = 0;
    for(const deposite of allDeposite_obj){
        gTotal += deposite.deposite_amount;
    }
    return gTotal;

}

module.exports = {
    totalDepositeByUser,
    grandTotalDeposite
}