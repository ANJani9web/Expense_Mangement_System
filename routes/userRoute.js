// importing express for routes and servers
const express = require('express')
const { loginController, 
    registerController } = require('../controllers/userController')

// router object
const router = express.Router()

// routers
// Login for user || POST
router.post('/login',loginController)

// Register for user || POST
router.post('/register',registerController)





// exporting router object
module.exports = router