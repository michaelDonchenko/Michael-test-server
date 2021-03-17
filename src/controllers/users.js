const User = require('../models/User')

//register a new user
exports.register = async (req, res) => {
  const { username, email, age } = req.body

  try {
    const usernameExists = await User.findOne({ username })

    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: 'Username has to be unique',
      })
    }

    const emailExists = await User.findOne({ email })

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      })
    }

    const user = new User({
      ...req.body,
    })

    await user.save()

    return res.status(201).json({
      success: true,
      message: 'User registered succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

//get all users
exports.allUsers = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10
  const page = req.query.page ? parseInt(req.query.page) : 1
  const sort = req.query.sort ? req.query.sort : 'createdAt'
  const order = req.query.order ? parseInt(req.query.order) : -1

  try {
    const users = await User.find()
      .sort([[sort, order]])
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()

    if (!users) {
      return res.status(404).json({
        success: false,
        message: 'Could not find any users',
      })
    }

    const count = await User.find().estimatedDocumentCount()

    return res.status(200).json({
      success: true,
      users: users,
      count: count,
      pages: Math.ceil(count / limit),
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}
