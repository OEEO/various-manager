const express = require('express')
const config = require(__dirname + '/config')

const app = express()

app.use(express.static(__dirname + '/dist'))

let port = config.dev.port
app.listen(port, () => {
  console.log(`http is listening 127.0.0.1:${port}`)
})
