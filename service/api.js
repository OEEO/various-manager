const express = require('express')
const router = express.Router()
const moment = require('moment')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const formidable = require('formidable')
// article数据模型
const articleSchema = mongoose.Schema({
  title: String,
  content: String
})
const Article = mongoose.model('article', articleSchema)

// user数据模型
const userSchema = mongoose.Schema({
  username: String,
  password: String
})
const User = mongoose.model('user', userSchema)

// 连接数据库 blog
const blogMongoUrl = 'mongodb://127.0.0.1:27017/blog'
mongoose.connect(blogMongoUrl)

router.use((req, res, next) => {
  // console.log('连接时间：' + moment().format('YYYY年MM月DD日 HH:mm:ss'))
  next()
})

// 解决跨域问题
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Authorization')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

router.get('/', (req, res) => {
  res.send('这是首页')
})

// 富文本编辑器
router.post('/api/newPost', (req, res) => {
  console.log(req)
  res.send({info: '获取图片成功'})
})

// 登录接口
router.post('/api/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  User.findOne({
    username: username,
    password: password
  })
    .then(data => {
      if (data) {
        let token = jwt.sign({ username: username }, 'isUserLogin', {expiresIn: 30000})
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
        console.log('token失效', err)
        reject(err)
      } else {
        console.log('token有效', decode)
        resolve()
      }
    })
  })
  jwtVerifyPromise
    .then(() => {
      next()
    })
    .catch(err => {
      res.send({
        tokenIsOutdated: true,
        msg: err.JsonWebTokenError
      })
    })
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

// 注册接口
router.post('/api/register', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let newUser = new User({
    username: username,
    password: password
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

// 获取文章接口
router.get('/api/article', (req, res) => {
  Article.find((err, articles) => {
    if (err) {
      console.log(err)
      res.send({
        fail: 'fail',
        msg: '没有文章'
      })
    } else {
      res.send(JSON.stringify(articles))
    }
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

// 添加文章接口
router.post('/api/createArticle', (req, res) => {
  let article = req.body
  let title = article.title
  let content = article.content
  let insertData = new Promise((resolve, reject) => {
    const newArticle = new Article({
      title: title,
      content: content
    })
    newArticle.save((err, res) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
  insertData
    .then(() => {
      res.send({
        success: 'success',
        msg: '创建文章成功'
      })
    })
    .catch(err => {
      res.send({
        fail: 'fail',
        msg: '创建文章失败' + err
      })
    })
})

// 删除文章接口
router.post('/api/deleteArticle', (req, res) => {
  let id = req.body.id
  Article.deleteOne({_id: id})
    .then(data => {
      console.log(data)
      if (data) {
        res.send({
          msg: `${id}删除成功`
        })
      }
    })
    .catch(error => {
      res.send({
        error: 'error',
        msg: `${id}删除失败${error}`
      })
    })
})

module.exports = router
