const express = require('express')
const router = express.Router()
const moment = require('moment')
const jwt = require('jsonwebtoken')
const { User, Article } = require('../mongodb')

/**
 * @api {post} /api/register 注册
 * @apiGroup Register
 * @apiName Register
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} surname 昵称
 *
 * @apiSuccessExample Success-Response:
 * {
 *    success: 'success',
 *    username: data.username,
 *    msg: '注册成功'
 * }
 *
 * @apiErrorExample Error-Response:
 * {
 *    error: error,
 *    msg: '发生错误'
 * }
 */
router.post('/', (req, res) => {
  let username = req.body.username
  let surname = req.body.surname
  let password = req.body.password
  let newUser = new User({
    username: username,
    surname: surname,
    password: password,
    logindate: '',
    registerDate: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  let addUser = new Promise((resolve, reject) => {
    newUser.save((err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
  addUser.then(data => {
    if (data) {
      res.send({
        success: 'success',
        username: data.username,
        msg: '注册成功'
      })
    } else {
      res.send({
        fail: 'fail',
        msg: '注册失败'
      })
    }
  })
    .catch(error => {
      res.send({
        error: error,
        msg: '发生错误'
      })
    })
})

/**
 * @api {post} /api/register/checkname 用户名是否存在
 * @apiGroup Register
 * @apiName checkname
 * @apiParam {String} username 用户名
 *
 * @apiSuccessExample Success-Response:
 * {
 *    exist: true,
 *    msg: '用户已存在'
 * }
 * 或
 * {
 *    exist: false,
 *    msg: '用户可注册'
 * }
 *
 * @apiErrorExample Error-Response:
 * {
 *    error: error,
 *    msg: '发生错误'
 * }
 */
router.get('/checkname', (req, res) => {
  let username = req.query.username
  User.findOne({
    username: username
  })
    .then(data => {
      console.log(data)
      if (data) {
        res.send({
          exist: true,
          msg: '用户已存在'
        })
      } else {
        res.send({
          exist: false,
          msg: '用户可注册'
        })
      }
    })
    .catch(error => {
      res.send({
        error: error,
        msg: '发生错误'
      })
    })
})

module.exports = router
