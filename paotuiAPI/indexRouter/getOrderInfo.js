const express = require('express')
const exec = require('../mysql/index')

const orderInfoRouter = express.Router()
orderInfoRouter.get('/order', (req, res) => {
  let { type, username, whoreceive } = req.query
  type = type == 'all' ? '' : type
  if (!type) { type = ''}
  let userType = ''
  let value = ''
  userType = username ? 'username' : 'whoreceive'
  value = username ? username : whoreceive
  // type : a1 a2 a3 a4 b1 b2 b3 b4 all
  let sql = `select * from products where type like "%${type}%"`
  if (value) {
    sql += `and ${userType} = "${value}"`
  }

  console.log(sql)
  exec.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send({
      code: 1,
      result,
    })
  })
})
module.exports = orderInfoRouter
