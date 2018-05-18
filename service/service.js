const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()

let token = ''

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/', api)

app.listen(80)
