const login = require('./login')
const register = require('./register')
const user = require('./user')
const article = require('./article')
const album = require('./album')

module.exports = (app) => {
  app.use('/api/register', register)
  app.use('/api/login', login)
  app.use('/api/user', user)
  app.use('/api/article', article)
  // app.use('/api/album', album)
}
