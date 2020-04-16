const express = require('express')
const app = express()

import bodyParser from 'body-parser'
import { serverIndex } from './app'
import morgan from 'morgan'
import { logger } from './utils/logger'
import connect from './config/mysql'

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(serverIndex)
app.use(
  morgan(':date[iso] :remote-addr :method :url :status :user-agent', {
    stream: logger.stream
  })
)

connect.connect(err => {
  if (err) throw err;
  console.log('Mysql 连接成功')
})

// 访问静态资源
app.use(express.static(__dirname + '/static'))

app.listen('3000', () => {
  console.log('Server running at http://localhost:3000')
})
