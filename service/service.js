const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', api)

app.listen(80)
