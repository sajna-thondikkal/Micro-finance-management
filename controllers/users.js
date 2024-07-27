const userRepositories = require('../repositories/users');
const asyncHandler = require('../middlewares/asyncHandler');
const {hashPassword} = require('../utils/passwordHelper');
const {compareWithHashedPassword} = require('../utils/passwordHelper');
const {createjwt} = require('../utils/jwtHelper');

// get all users
const allUsers = asyncHandler(async(req,res,next)=>{
    const users = await userRepositories.getAllUsers();

    if(users && users.length > 0){
        res.status(200).json({"success":true,"Data":users});
    }
    else{
        res.status(404).json({"Message":"No users found"});
    }
})

// get user by id
const getUserById = asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const user = await userRepositories.getUserById(id);
    if(user){
        res.status(200).json({"Success":true,Data:user});
    }
    else{
        res.status(404).json({"Message":"No user found"});
    }
})

// get user by user name or login
const login = asyncHandler(async(req,res,next)=>{
    const {user_name,password} = req.body;
    const user = await userRepositories.loginUser(user_name);
    if(user){
        const validUser = compareWithHashedPassword(password,user.password);
        if(validUser){
            const token = createjwt(user);
            return res.status(200).json({"success":true,"Message":"User logged in successfully",Data:user,Token:token});
        }else{
            return res.status(200).json({"Message":"Not a valid user"});
        }
    }
    else{
        res.status(404).json({"Message":"User not found"});
    }
})

// create users
const createUser = asyncHandler(async(req,res,next)=>{
    const {user_name,password,user_role,address,phone} = req.body;
    console.log("hello");
    const hashedPassword = hashPassword(password);
    const newUser = await userRepositories.createUser({user_name,password:hashedPassword,user_role,address,phone});
    console.log("New user",newUser);
    if(newUser){
        const token = createjwt(newUser);
        res.status(200).json({"Success":true,Data:newUser,Token:token});
    }
    else{
        res.status(404).json({"Message":"Not created new user"});
    }
})

// update user
const updateUser = asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const {user_name,password,user_role,address,phone} = req.body;
    const hashedPassword = hashPassword(password);
    const updated = await userRepositories.updateUser(id,{user_name,password:hashedPassword,user_role,address,phone});
    if(updated){
        res.status(200).json({"Success":true,Data:updated});
    }
    else{
        res.status(404).json({"Message":"Not updated"});
    }
})

// delete user
const deleteUser = asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const ifExist = await userRepositories.getUserById(id);
    if(ifExist){
        const delet = await userRepositories.deleteUser(id);
        res.status(200).json({"Message":`Successfully deleted user with id ${id}`});
    }
    else{
        res.status(404).json({"Message":"User not exist"});
    }
})

module.exports = {
    allUsers,
    getUserById,
    login,
    createUser,
    login,
    updateUser,
    deleteUser
}