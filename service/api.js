const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  console.log('打开时间：' + Date.now())
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
  console.log(req.body)
  res.send('这是创建文章页')
})

module.exports = router
