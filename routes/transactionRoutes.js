const express = require('express')
const { addTransaction,
     getAllTransaction, 
     editTransaction,
     deleteTransaction} = require('../controllers/transactionCtrl')

// router object
const router = express.Router()


// add routes
// add transaction POST METHOD
router.post('/add-transaction',addTransaction)

// get transactions
router.post('/get-transactions',getAllTransaction)

// for editing the transactions POST METHOD
router.post('/edit-transaction',editTransaction)

// for deleting the transactions using POST METHOD
router.post('/delete-transaction',deleteTransaction)


// exporting route
module.exports = router