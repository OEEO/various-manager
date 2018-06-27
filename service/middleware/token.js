const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // options请求、login、register、allArticle；不需要验证token
  let isOption = req.method.toLowerCase() === 'options'
  let isLogin = req.originalUrl.indexOf('/login') !== -1
  let isRegister = req.originalUrl.indexOf('/register') !== -1
  let isAllArticle = req.originalUrl.indexOf('/article/all') !== -1
  let isArticleDetail = req.originalUrl.indexOf('/article/detail') !== -1

  let notVerToken = isOption || isLogin || isRegister || isAllArticle || isArticleDetail
  if (notVerToken) {
    next()
    return
  }
  let token = req.headers.authorization
  console.log(token)
  let jwtVerifyPromise = new Promise((resolve, reject) => {
    jwt.verify(token, 'isUserLogin', (err, decode) => {
      if (err) {
        console.log('token失效')
        reject(err)
      } else {
        console.log('token有效')
        console.log(decode.username)
        resolve(decode)
      }
    })
  })
  jwtVerifyPromise
    .then(decode => {
      req.curUsername = decode.username
      req.curSurname = decode.surname
      next()
    })
    .catch(err => {
      res.send({
        tokenIsOutdated: true,
        msg: err.JsonWebTokenError
      })
    })
}
