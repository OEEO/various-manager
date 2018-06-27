const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  surname: String,
  password: String,
  logindate: String,
  registerDate: String
})
const User = mongoose.model('user', userSchema)

module.exports = User
