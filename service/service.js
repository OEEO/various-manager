const express = require('express')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')

const router = require('./api')
const access = require('./middleware/access')
const token = require('./middleware/token')

const app = express()

app.use(access)
app.use(token)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser('esport', {
//   httpOnly: true
// }))

router(app)

let port = 8088
app.listen(port, () => {
  console.log(`node server listening the port ${port}.....`)
})
