const express = require('express')
const { addTransaction,
     getAllTransaction } = require('../controllers/transactionCtrl')

// router object
const router = express.Router()


// add routes
// add transaction POST METHOD
router.post('/add-transaction',addTransaction)

// get transactions
router.get('/get-transactions',getAllTransaction)


// exporting route
module.exports = router