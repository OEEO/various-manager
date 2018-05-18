const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()
const urlTest = 'mongodb://localhost:27017/test'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/', api)

const url = 'mongodb://localhost:27017/tteesstt'
MongoClient.connect(url, function (err, client) {
  if (err) {
    console.log('数据库连接失败')
    return
  }
  console.log('数据库连接成功')
  const db = client.db('tteesstt')
  db.collection('user').insertOne({
    'username': 'jmin呀',
    'age': 23,
    'sex': '男'
  }, function (err, result) {
    if (err) {
      console.log('插入数据失败')
      return
    }
    console.log('插入数据成功', result)
  })
})

app.listen(80)
