const express = require('express')
const app = express()

import * as user from './entry'

app.post('/api/login', user.login)
app.post('/api/regist', user.regist)

app.use((err, req, res, next) => {
    next(err)
})

export { app as serverIndex }