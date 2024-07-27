const Role = require('../models/roles');


// get all users
async function getAllRoles(){
    try {
        const allRoles = await Role.find();
        return allRoles;
    } catch (error) {
        console.log("Error while getting all roles",error);
        throw error;
    }
}

// get roles by id
async function getRolesById(id){
    try {
        const role = await Role.findById(id);
        return role;
    } catch (error) {
        console.log("Error while getting role",error);
        throw error;
    }
}

// create role
async function createRole(role_name){
    try {
        const newRole = await Role.create(role_name);
        return newRole;
    } catch (error) {
        console.log('Error while creating new role',error);
        throw error;
    }
}

// update role
async function updateRole(id,role_name){
    try {
        const updateRole = await Role.findByIdAndUpdate(id,role_name,{new:true,runValidators:true});
        return updateRole;
    } catch (error) {
        console.log("Error while updating role",error);
        throw error;
    }
}

// delete role
async function deleteRole(id){
    try {
        const result = await Role.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.log("Error while deleting",error);
        throw error;
    }
}

module.exports = {
    getAllRoles,
    getRolesById,
    createRole,
    updateRole,
    deleteRole
}