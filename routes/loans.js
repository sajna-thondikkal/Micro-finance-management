const express = require('express');
const router = express.Router();
const loanControllers = require('../controllers/loans');
const { route } = require('./roles');

// get all loans
router.get('/',loanControllers.getAllLoans);

// get loan by id
router.get('/:id',loanControllers.getLoanById);

// make a loan
router.post('/',loanControllers.makeLoan);

module.exports = router;