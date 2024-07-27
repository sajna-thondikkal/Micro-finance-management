const express = require('express');
const router = express.Router();
const rolesControllers = require('../controllers/roles');

// get all roles
router.get('/',rolesControllers.getAllRoles);

// get roles by id
router.get('/:id',rolesControllers.getRoleById);

// create role
router.post('/',rolesControllers.createRole);

// update role
router.put('/:id',rolesControllers.updateRole);

// delete roles
router.delete('/:id',rolesControllers.deleteRole);
module.exports = router;