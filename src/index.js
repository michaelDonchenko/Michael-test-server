//imports
const express = require('express')
const cors = require('cors')
const { PORT } = require('./constants')
const connectDB = require('./database')

//init app
const app = express()

//init middleware
app.use(express.json({ limit: '5mb' }))
app.use(cors())

//Router exports
const userRoutes = require('./routes/users')

//inject sub routes and apis
app.use('/api', userRoutes)

const appStart = () => {
  try {
    connectDB()

    app.listen(PORT, () => {
      console.log(`The app listening at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()
