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
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By',' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

router.get('/', (req, res) => {
  res.send('这是首页')
})

router.get('/api/article', (req, res) => {
  let articles = [
    { id: 1, title: '文章1', content: '内容1' },
    { id: 2, title: '文章2', content: '内容2' },
    { id: 3, title: '文章3', content: '内容3' }
  ]
  res.send(JSON.stringify(articles))
})

router.get('/api/article/:num', (req, res) => {
  let num = req.params.num
  res.send(`第${num}篇文章`)
})

router.post('/api/createArticle', (req, res) => {
  console.log(req.body)
  res.send('这是创建文章页')
})

module.exports = router
