const express = require('express');
const router = express.Router();
const depositeControllers = require('../controllers/deposites');

// get all deposite details
router.get('/',depositeControllers.getAllDepositeDetails);

// get deposite by id
router.get('/:id',depositeControllers.getDepositeById);

// get deposite by name
router.post('/depositebyname',depositeControllers.getDepositeByName);

// create a deposite
router.post('/',depositeControllers.makeDeposite);

// update deposite
router.put('/:id',depositeControllers.updateDeposite);

// delete deposite
router.delete('/:id',depositeControllers.deleteDeposite);

module.exports = router;