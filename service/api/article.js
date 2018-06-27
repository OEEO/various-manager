const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { User, Article } = require('../mongodb')

/**
 * @api {get} /api/article/all 获取所有文章数据
 * @apiGroup Article
 * @apiName getArticleAll
 *
 * @apiSuccessExample Success-Response:
 * {
 *      "data": [
 *         {
 *             "_id": "5b3302540fc22700200af738",
 *             "author": "814731008@qq.com",
 *             "username": "814731008@qq.com",
 *             "title": "23123",
 *             "content": "123123",
 *             "__v": 0
 *         },
 *         ...
 *     ]
 * }
 *
 * @apiErrorExample Error-Response:
 * {
 *    "fail": "fail",
 *    "msg": "没有文章"
 * }
 */
router.get('/all', (req, res) => {
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

/**
 * @api {get} /api/article/user 获取用户文章数据
 * @apiGroup Article
 * @apiName getArticleUser
 * @apiParam {Number} id 游戏Id
 * @apiParam {String} game 游戏,kog或lol
 *
 * @apiSuccessExample Success-Response:
 *
 * {
 *      "data": [
 *         {
 *             "_id": "5b3302540fc22700200af738",
 *             "author": "814731008@qq.com",
 *             "username": "814731008@qq.com",
 *             "title": "23123",
 *             "content": "123123",
 *             "__v": 0
 *         },
 *         ...
 *     ]
 * }
 *
 * @apiErrorExample Error-Response:
 * {
 *     fail: 'fail',
 *     msg: '没有文章'
 * }
 */
router.get('/user', (req, res) => {
  let username = req.curSurname
  Article.find({username: username}, (err, articles) => {
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

/**
 * @api {post} /api/article/add 添加文章
 * @apiGroup Article
 * @apiName addArticle
 * @apiParam {String} title 文章标题
 * @apiParam {String} content 文章内容
 *
 * @apiSuccessExample Success-Response:
 * {
 *    data: {
        success: 'success',
        msg: '创建文章成功'
      }
 * }
 *
 * @apiErrorExample Error-Response:
 * {
 *     fail: 'fail',
 *     msg: '创建文章失败'
 * }
 */
router.post('/add', (req, res) => {
  let article = req.body
  let username = req.curUsername
  let author = req.curSurname ? req.curSurname : username
  let title = article.title
  let content = article.content
  let insertData = new Promise((resolve, reject) => {
    const newArticle = new Article({
      author: author,
      username: username,
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

/**
 * @api {post} /api/article/del 删除文章
 * @apiGroup Article
 * @apiName addArticle
 * @apiParam {String} id 文章Id
 *
 * @apiSuccessExample Success-Response:
 * {
 *    msg: "删除成功"
 * }
 *
 * @apiErrorExample Error-Response:
 * {
 *     fail: 'fail',
 *     msg: '删除失败'
 * }
 */
router.post('/del', (req, res) => {
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
        fail: 'fail',
        msg: `${id}删除失败${error}`
      })
    })
})

/**
 * @api {post} /api/article/detail 文章详情
 * @apiGroup Article
 * @apiName addArticle
 * @apiParam {String} id 文章Id
 *
 * @apiSuccessExample Success-Response:
 * {
      data: {
        title: "标题",
        content: "内容",
        img: "http:://example.com/1.jpg",
        imgTitle: "图片描述"
      }
 * }
 *
 * @apiErrorExample Error-Response:
 * {
 *     fail: '',
 *     msg: ''
 * }
 */
router.get('/detail', (req, res) => {
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
