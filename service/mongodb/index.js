const mongoose = require('mongoose')

const User = require('./user')
const Article = require('./article')
// article数据模型
// const articleSchema = mongoose.Schema({
//   username: String,
//   author: String,
//   title: String,
//   content: String
// })
// const Article = mongoose.model('article', articleSchema)

// user数据模型
// const userSchema = mongoose.Schema({
//   username: String,
//   surname: String,
//   password: String,
//   logindate: String
// })
// const User = mongoose.model('user', userSchema)

// 连接数据库 blog
const blogMongoUrl = 'mongodb://127.0.0.1:27017/blog'
mongoose.connect(blogMongoUrl)

module.exports = {
  Article: Article,
  User: User
}
