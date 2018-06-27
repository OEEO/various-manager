const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { User, Article } = require('../mongodb')

/**
 * @api {post} /api/user/profile 用户资料
 * @apiGroup User
 * @apiName profile
 *
 * @apiSuccessExample Success-Response:
 * {
 *    success: 'success',
 *    username: username,
 *    surname: surname
 * }
 */
router.get('/profile', (req, res) => {
  let username = req.curUsername
  let surname = req.curSurname
  res.send({
    success: 'success',
    username: username,
    surname: surname
  })
})

module.exports = router
