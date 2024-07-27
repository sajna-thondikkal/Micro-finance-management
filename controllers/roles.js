const roleRepositories = require('../repositories/roles');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');


// get all roles
const getAllRoles = asyncHandler(async(req,res,next)=>{
        const allRoles = await roleRepositories.getAllRoles();
        if(allRoles && allRoles.length > 0){
            res.status(200).json({status:'Success',Data:allRoles});
        }
        else{
            res.status(200).json({status:'Success',Data:'No roles found'});
        }
        // next(new ErrorResponse(error));
})

// get role by id
const getRoleById = asyncHandler(async (req,res,next)=>{
    const id = req.params.id;
    const getRole = await roleRepositories.getRolesById(id);
    if(getRole){
        res.status(200).json({status:"Success",Data:getRole});
    }
    else{
        res.status(200).json({status:"success",Data:'No role found'});
    }
})

// create role
const createRole = asyncHandler(async(req,res,next)=>{
    const role_name = req.body;
    const newRole = await roleRepositories.createRole(role_name);
    if(newRole){
        res.status(200).json({status:'Success',Data:newRole});
    }
    else{
        res.status(200).json({status:'Success',Dats:"Not created new role"});
    }
})

// update role
const updateRole = asyncHandler(async (req,res,next)=>{
    const id = req.params.id;
    const role_name = req.body;
    const exist = await roleRepositories.getRolesById(id);
    if(exist){
        const updatedRole = await roleRepositories.updateRole(id,role_name);
        if (updatedRole) {
            res.status(200).json({status:'Success',Data:updatedRole});
        } else {
            res.status(200).json({"Message":"Not updated role"});
        }    
    }
    else{
        res.status(404).json({"message":`Role doesnot exist with id ${id}`})
    }
})

// delete role
const deleteRole = asyncHandler(async (req,res,next)=>{
    const id = req.params.id;
    const ifExist = await roleRepositories.getRolesById(id);
    if(ifExist){
        await roleRepositories.deleteRole(id);
        res.status(200).json({"Success":true,"Message":`Role deleted with id ${id}`});
    }
    else{
        res.status(404).json({"Success":false,"Message":`Role doesnot exist with id ${id}`});
    }
})

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}