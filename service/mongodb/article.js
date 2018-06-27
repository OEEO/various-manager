const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  username: String,
  author: String,
  title: String,
  content: String
})
const Article = mongoose.model('article', articleSchema)

module.exports = Article
