const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const moment = require('moment')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const formidable = require('formidable')


router.use((req, res, next) => {
  // console.log('连接时间：' + moment().format('YYYY年MM月DD日 HH:mm:ss'))
  console.log(req.url)
  next()
})

router.get('/', (req, res) => {
  res.send('这是node服务器')
})

// 富文本编辑器
router.post('/api/newPost', (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = path.resolve(__dirname, '../static/uploads/images')
  form.keepExtensions = true
  form.multiples = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
    } else {
      let time = moment().format('YYYY-MM-DD-HH-mm-ss')
      console.log(time)
      let oldpath = files.img.path
      let newpath = path.join(path.dirname(oldpath), time + files.img.name)
      console.log(newpath)
      fs.rename(oldpath, newpath, (err) => {
        if (err) {
          throw err
        }
        let url = newpath.split('Express02')[1].replace(/\\/g, '/')
        res.send({
          url: url
        })
      })
    }
  })
})

// 登录接口
router.post('/api/login', (req, res) => {
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

// 退出接口
router.post('/api/logout', (req, res) => {

})



// 注册前查询用户名是否已存在
router.get('/api/username', (req, res) => {
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



// 验证token
router.all('*', (req, res, next) => {
  // 忽略options请求
  if (req.method.toLowerCase() === 'options') {
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
})

// 获取用户资料
router.get('/api/getUserProfiles', (req, res) => {
  let username = req.curUsername
  let surname = req.curSurname
  res.send({
    success: 'success',
    username: username,
    surname: surname
  })
})



// 获取图片接口
// TODO: 获取图片接口
router.get('/api/images', (req, res) => {
  let result = []
  for (let i = 1; i < 6; i++) {
    let img = {
      url: `/static/images/${i}.jpg`,
      imgTitle: `第${i}张图片`
    }
    result.push(img)
  }
  res.send(JSON.stringify(result))
})

// TODO: 上传图片接口
router.post('/api/addImage', (req, res) => {
  console.log(req)
})

// TODO: 文章详情页接口
router.get('/api/articleDetail', (req, res) => {
  let id = req.query.id
  let result = {
    title: `第${id}篇文章`,
    content: '内容内容',
    img: `/static/images/${id}.jpg`,
    imgTitle: `第${id}张图片`
  }
  res.send(JSON.stringify(result))
})





module.exports = router
