const { Router } = require('express')
const { validationMiddleware } = require('../middlewares/validation-middleware')
const { registerValidators } = require('../validators/userValidators')
const { register, allUsers } = require('../controllers/users')

const router = Router()

//register
router.post('/register', registerValidators, validationMiddleware, register)

//all users
router.get('/users', allUsers)

module.exports = router
