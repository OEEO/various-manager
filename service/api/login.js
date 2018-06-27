const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { User, Article } = require('../mongodb')

/**
 * @api {post} /api/login 登录
 * @apiGroup Login
 * @apiName Login
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 *
 * @apiSuccessExample Success-Response:
 * {
 *    success: 'success',
 *    username: username,
 *    msg: '登录成功',
 *    token: token
 * }
 *
 * @apiErrorExample Error-Response:
 * {
 *    fail: 'fail',
 *    msg: '用户名或密码不正确'
 * }
 */
router.post('/', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  console.log(username, password)
  User.findOneAndUpdate({
    username: username,
    password: password
  }, {
    logindate: moment().format('YYYY-MM-DD HH:mm:ss')
  })
    .then(data => {
      if (data) {
        let token = jwt.sign({ username: username, surname: username }, 'isUserLogin', {expiresIn: 60 * 60 * 24 * 7})

        res.send({
          success: 'success',
          username: username,
          msg: '登录成功',
          token: token
        })
      } else {
        res.send({
          fail: 'fail',
          msg: '用户名或密码不正确'
        })
      }
    })
    .catch(error => {
      console.log('发生错误', error)
    })
})

module.exports = router
