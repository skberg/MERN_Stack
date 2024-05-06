const express = require('express')

//controller functions
const { signupUser,loginUser } = require('../controllers/user_controller')



const router = express.Router()

//login
router.post('/login', loginUser)


//singup
router.post('/signup', signupUser)


module.exports = router