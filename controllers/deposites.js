const depositeRepositories = require('../repositories/deposites');
const asyncHandler = require('../middlewares/asyncHandler');
const depositeService = require('../services/deposites');

// get all deposite detail
const getAllDepositeDetails = asyncHandler(async(req,res,next)=>{
    const allDeposite = await depositeRepositories.getAllDeposite()
    if(allDeposite && allDeposite.length > 0){
        const totalDeposite = depositeService.grandTotalDeposite(allDeposite);
        res.status(200).json({"Message":"All Deposites",Data:allDeposite,GrandTotal: totalDeposite});
    }
    else{
        res.status(404).json({"Message":"No deposite to display"});
    }
})

// get deposite by id
const getDepositeById = asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const deposite = await depositeRepositories.getDepositeById(id);
    if(deposite){
        res.status(200).json({"Message":"Deposite with id is:",Data:deposite});
    }
    else{
        res.status(404).json({"Message":"Node deposite found with this id"});
    }
})

// get deposite by name
const getDepositeByName = asyncHandler(async(req,res,next)=>{
    const {user_name} = req.body;
    const depositeByName = await depositeRepositories.getDepositeByName(user_name);
    if(depositeByName){
        const totalDeposite = depositeService.totalDepositeByUser(depositeByName);
        res.status(200).json({"Message":"Deposite for particular user id",Data:depositeByName,Total:totalDeposite});
    }
    else{
        res.status(404).json({"Message":"No deposite for this user"});
    }
})


// make deposite
const makeDeposite = asyncHandler(async(req,res,next)=>{
    const {date,user_name,deposite_amount} = req.body;
    const newDeposite = await depositeRepositories.makeDeposite({date:new Date(),user_name,deposite_amount});
    if(newDeposite){
        res.status(200).json({"Message":"Successful",Data:`You are deposited amount of ${newDeposite.deposite_amount}`});
    }
    else{
        res.status(404).json({"Message":"No deposite created"});
    }
})

// update deposite
const updateDeposite = asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const {user_name,deposite_amount} = req.body;
    const updated = await depositeRepositories.updateDeposite(id,{user_name,deposite_amount});
    if(updated){
        res.status(200).json({"Message":"Updated successfully","Data":updated});
    }
    else{
        res.status(404).json({"Message":"Deposite not updated"});
    }
})


// delete deposite
const deleteDeposite = asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const ifExist = await depositeRepositories.getDepositeById(id);
    if(ifExist){
        await depositeRepositories.deleteDeposite(id);
        res.status(200).json({"Success":true,"Message":`Successfully deleted the deposite with id ${id}`});
    }
    else{
        res.status(404).json({"Message":"Deposite not found"});
    }
})

module.exports = {
    getAllDepositeDetails,
    getDepositeById,
    getDepositeByName,
    makeDeposite,
    updateDeposite,
    deleteDeposite
}