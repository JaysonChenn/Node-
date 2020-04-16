let mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '654321',
  port: '3306',
  database: 'myapp'
})

module.exports = connection
