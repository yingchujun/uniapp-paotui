const express = require('express')
const exec = require('../mysql/index')

const checkRouter = express.Router()

checkRouter.get('/checkout', (req, res) => {
  let { username, orderid } = req.query

  let sql = `select * from products where orderID = "${orderid}"`

  exec.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    }
    if (!result.whoreceive) {
      let sql = `update products set whoreceive = "${username}" where orderID = "${orderid}"`
      console.log(sql)
      exec.query(sql, (err, result) => {
        if (err) {
          console.log(err)
          return err
        }

        res.send({
          code: 1,
          msg: '接取成功',
        })
      })
    }
  })
})
module.exports = checkRouter
