const { validationResult } = require('express-validator')

exports.validationMiddleware = (req, res, next) => {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
      success: false,
    })
  }
  next()
}
