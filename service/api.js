const express = require('express')
const router = express.Router()
const moment = require('moment')
const mongoose = require('mongoose')

const blogMongoUrl = 'mongodb://127.0.0.1:27017/blog'

// article数据模型
const articleSchema = mongoose.Schema({
  title: String,
  content: String
})

const Article = mongoose.model('article', articleSchema)

const userSchema = mongoose.Schema({
  username: String,
  password: String
})

const User = mongoose.model('user', userSchema)

router.use((req, res, next) => {
  // console.log('连接时间：' + moment().format('YYYY年MM月DD日 HH:mm:ss'))
  next()
})

// 解决跨域问题
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

router.get('/', (req, res) => {
  res.send('这是首页')
})

router.get('/api/username', (req, res) => {
  const url = blogMongoUrl
  mongoose.connect(url)
  let username = req.query.username
  console.log(username)
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
    .catch(data => {
      res.send({
        exist: false,
        msg: '发生错误'
      })
    })
})

router.post('/api/login', (req, res) => {
  const url = blogMongoUrl
  mongoose.connect(url)
  let username = req.body.username
  let password = req.body.password
  console.log(username, password)
  User.findOne({
    username: username,
    password: password
  })
    .then(data => {
      console.log(data)
      if (data) {
        res.send({
          success: 'success',
          username: username,
          msg: '登录成功'
        })
      } else {
        res.send({
          error: 'error'
        })
      }
    })
    .catch(error => {
      console.log('登录失败')
    })
})

router.post('/api/register', (req, res) => {
  let url = blogMongoUrl
  mongoose.connect(url)
  let username = req.body.username
  let password = req.body.password
  let newUser = new User({
    username: username,
    password: password
  })
  let addUser = new Promise((resolve, reject) => {
    mongoose.connect(url)
    const db = mongoose.connection
    db.once('open', () => {
      newUser.save((err, res) => {
        if (err) {
          console.log(err)
          return
        }
        resolve(res)
      })
    })
  })
  addUser.then(data => {
    res.send({
      username: data.username
    })
  })
})

router.get('/api/article', (req, res) => {
  const url = blogMongoUrl
  mongoose.connect(url)
  Article.find((err, articles) => {
    if (err) {
      res.send({
        error: '没有文章'
      })
      return
    }
    res.send(JSON.stringify(articles))
  })
})

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

router.post('/api/createArticle', (req, res) => {
  const url = blogMongoUrl
  let article = req.body
  let title = article.title
  let content = article.content
  let insertData = new Promise((resolve, reject) => {
    let msg = ''
    mongoose.connect(url)
    const db = mongoose.connection
    db.on('error', () => {
      res.send({
        err: '连接数据库失败'
      })
    })
    db.once('open', () => {
      console.log('数据库连接成功')
      const newArticle = new Article({
        title: title,
        content: content
      })
      newArticle.save((err, res) => {
        if (err) {
          reject(err)
        }
        resolve('success')
      })
    })
  })
  insertData
    .then(msg => {
      res.send({
        success: msg
      })
    })
    .catch(err => {
      res.send({
        error: err
      })
    })
})

router.post('/api/deleteArticle', (req, res) => {
  let id = req.body.id
  console.log(id)
  Article.deleteOne({_id: id})
    .then(res => {
      res.send({
        msg: `${id}删除成功`
      })
    })
    .catch(error => {
      res.send({
        error: 'error',
        msg: `${id}删除失败`
      })
    })
})

module.exports = router
