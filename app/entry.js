import * as constants from '../config/constants'
import connection from '../config/mysql'

async function loginAsync(req, res) {
  let username = req.body.username
  let password = req.body.password
  if (!username || !password) {
    return res.json(Object.assign({}, constants.ErrorParam, { data: null }))
  } else if (username == 'admin' && password == '123456') {
    return res.json(Object.assign({}, constants.Success, { data: null }))
  } else {
    return res.json(
      Object.assign({}, constants.ErrorAuthentication, { data: null })
    )
  }
}

async function registAsync(req, res) {
  let username = req.body.username
  let password = req.body.password
  if (!username || !password) {
    return res.json(Object.assign({}, constants.ErrorParam, { data: null }))
  } else {
    let sql = `insert into user values('${ username }', ${ password })`
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        return res.json(Object.assign({}, constants.ErrorParam, { data: null }))
      } else {
        return res.json(Object.assign({}, constants.Success, { data: null }))
      }
    })
  }
}

const wrap = fn => (...args) =>
  fn(...args).catch(e => {
    console.log(e)
  })

let login = wrap(loginAsync)
let regist = wrap(registAsync)

export { login, regist }
