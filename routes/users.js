const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users');

// get all users
router.get('/',usersControllers.allUsers);

// get user by id
router.get('/:id',usersControllers.getUserById);

// login user
router.post('/login',usersControllers.login);

// create users or signUp 
router.post('/signup',usersControllers.createUser);

// update user
router.put('/:id',usersControllers.updateUser);

// delete user
router.delete('/:id',usersControllers.deleteUser);

module.exports = router;