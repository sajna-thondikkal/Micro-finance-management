const express = require('express');
const router = express.Router();
const withdrawControllers = require('../controllers/withdrawals');

// get all withdrawals
router.get('/',withdrawControllers.getAllWithdrawalDetails);

// get withdrawal by id
router.get('/:id',withdrawControllers.getWithdrawalById);

// get withdrawal by user
router.post('/withdrawbyuser',withdrawControllers.getWithdrawByName);

// make a withdrawal
router.post('/',withdrawControllers.makeWithdraw);

module.exports = router;