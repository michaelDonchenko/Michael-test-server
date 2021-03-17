const { check } = require('express-validator')

const username = check('username', 'Username is required')
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 15 })
  .withMessage('Username has to be between 2 to 15 characters')

const email = check('email', 'Please provide a valid email').isEmail()

const age = check('age', 'Age is required').not().isEmpty()

module.exports = {
  registerValidators: [username, email, age],
}
