const User = require('../models/users');

// get all users
async function getAllUsers(){
    try {
        const allUsers = await User.find().populate('user_role');
        return allUsers;
    } catch (error) {
        throw error;
    }
}

// get user by id
async function getUserById(id){
    try {
        const user = await User.findById(id).populate('user_role');
        return user;
    } catch (error) {
        throw error;
    }
}

// get user by name or login
async function loginUser(user_name){
    try {
        const user = await User.findOne({user_name:user_name}).populate('user_role').exec();
        return user;
    } catch (error) {
        throw error;
    }
}

// get user role from user id
async function getUserRole(id){
    try {
        const role = User.findById(id).exec();
        console.log(role);
        return role;
    } catch (error) {
        throw error;
    }
}

// create users
async function createUser(user_obj){
    try {
        const users = await User.create(user_obj)
        return users;
    } catch (error) {
        throw error;
    }
}
// update user
async function updateUser(id,user_obj){
    try {
        const updated = await User.findByIdAndUpdate(id,user_obj,{new:true,runValidators:true}).populate('user_role').exec();
        return updated;
    } catch (error) {
        throw error;
    }
}

// delete user
async function deleteUser(id){
    try {
        const result = await User.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    loginUser,
    getUserRole,
    createUser,
    updateUser,
    deleteUser
}