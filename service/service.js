const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', api)

const url = 'mongodb://localhost:27017/test'
MongoClient.connect(url, function (err, client) {
  if (err) {
    console.log('数据库连接失败')
    return
  }
  console.log('数据库连接成功')
  const db = client.db('test')
  db.collection('user').insertOne({
    'username': 'jmin呀',
    'age': 23,
    'sex': '男'
  }, function (err, result) {
    if (err) {
      console.log(err)
      console.log('插入数据失败')
      return
    }
    console.log('插入数据成功')
  })
})

app.listen(80)
