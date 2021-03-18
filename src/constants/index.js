//init .env config
const { config } = require('dotenv')
config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.APP_PORT || process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
}
