const express = require('express');
const router = express.Router();
const { submitTransaction } = require('../controllers/transactioncontroller');


// Protected route for submitting transaction
router.post('/submit',submitTransaction);

module.exports = router;