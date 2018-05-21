const express = require('express')
const router = express.Router()
const moment = require('moment')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

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

router.post('/api/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let msg = ''
  console.log(req.body)
  if (username === '814731008') {
    msg = 'success'
    if (password !== '123456') {
      msg = '密码不正确'
      username = ''
    }
  } else {
    msg = '用户名不正确'
    username = ''
  }
  let result = {
    msg: msg,
    username: username
  }
  res.send(JSON.stringify(result))
})

router.get('/api/article', (req, res) => {
  const url = 'mongodb://127.0.0.1:27017/article'
  mongoose.connect(url)
  const db = mongoose.connection
  db.on('error', () => {
    console.log('文章连接失败')
  })
  db.once('open', () => {
    console.log('文章连接成功')
    const kittySchema = mongoose.Schema({
      name: String
    })
    kittySchema.methods.sayName = function () {
      let greeting = this.name
        ? '我的名字是：' + this.name
        : '我还没有名字'
      console.log(greeting)
    }
    const Kitten = mongoose.model('Kitten', kittySchema)
    let yan = new Kitten({ name: 'yanshiyu' })
    let saveData = new Promise(resolve => {
      yan.save((err, res) => {
        if (err) {
          console.log('保存到数据库失败')
          return
        }
        resolve()
      })
    })
    saveData.then(() => {
      Kitten.find((err, res) => {
        if (err) {
          console.log('读取数据失败')
          return
        }
        console.log('读取数据成功' + res)
      })
    })
  })
  // let Person = mongoose.model('Person', yourSchema);
  //
  // Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
  //   if (err) return handleError(err)
  //   console.log('%s %s is a %s.', person.name.first, person.name.last,
  //     person.occupation)
  // })

  let articles = [
    { id: 1, title: '文章1', content: '内容1' },
    { id: 2, title: '文章2', content: '内容2' },
    { id: 3, title: '文章3', content: '内容3' }
  ]
  res.send(JSON.stringify(articles))
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
  const url = 'mongodb://127.0.0.1:27017/article'
  let article = req.body
  let title = article.title
  let content = article.content
  let insertData = new Promise((resolve, reject) => {
    let msg = ''
    MongoClient.connect(url, (err, client) => {
      if (err) {
        console.log('数据库连接失败')
        reject(msg)
        return
      }
      console.log('数据库连接成功')
      const db = client.db('article')
      db.collection('article1').insertOne({
        'title': title,
        'content': content
      }, (err, result) => {
        if (err) {
          console.log('插入数据失败')
          reject(msg)
          return
        }
        msg = 'success'
        resolve(msg)
      })
    })
  })
  insertData.then(msg => {
    if (msg) {
      res.send('success')
    } else {
      res.send('error')
    }
  })
})

module.exports = router
