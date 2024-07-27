const Deposite = require('../models/deposites');


// get All deposite
async function getAllDeposite(){
    try {
        const allDeposite = await Deposite.find().populate('user_name');
        // Extract and return the relevant fields
        const formattedDeposites = allDeposite.map(deposite => ({
            deposite_id: deposite.id,
            user_name: deposite.user_name.user_name,
            date: deposite.date,
            deposite_amount: deposite.deposite_amount
        }));
        return formattedDeposites;
    } catch (error) {
        throw error;
    }
}


// get deposite by id
async function getDepositeById(id){
    try {
        const deposite = await Deposite.findById(id);
        return deposite;
    } catch (error) {
        throw error;
    }
}

// get deposite by user
async function getDepositeByName(user_name){
    try {
        const depositeByName = await Deposite.find({user_name:user_name});
        return depositeByName;
    } catch (error) {
        throw error;
    }
}

// make deposite
async function makeDeposite(deposite_obj){
    try {
        const newDeposite = await Deposite.create(deposite_obj);
        return newDeposite;
    } catch (error) {
        throw error;
    }
}

// update deposite
async function updateDeposite(id,deposite_obj){
    try {
        const update = await Deposite.findByIdAndUpdate(id,deposite_obj,{new:true,runValidators:true});
        return update
    } catch (error) {
        throw error;
    }
}

// delete deposite
async function deleteDeposite(id){
    try {
        const deleted = await Deposite.findByIdAndDelete(id)
        return deleted;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllDeposite,
    getDepositeById,
    getDepositeByName,
    makeDeposite,
    updateDeposite,
    deleteDeposite
}