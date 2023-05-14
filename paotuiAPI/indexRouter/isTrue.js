const express = require('express')
const exec = require('../mysql/index')

const isTrueRouter = express.Router()

isTrueRouter.get('/istrue', (req, res) => {
  let { istrue, isfinish, orderid, money, username, whoreceive, type } = req.query
  console.log(req.query)

  let sql = `update products set istrue = ${Number(istrue)} where orderID = "${orderid}"`
  console.log(sql)

  exec.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      return err
    }

    if (isfinish == 1) {
      let sql2 = `update products set isfinish = ${Number(isfinish)} where orderID = "${orderid}"`
      exec.query(sql2, (err, result) => {
        if (err) return err
      })

      let sql1 = ''
      if (type.indexOf('a') != -1) {
        money = Number(money) - 1
        sql1 = `update user set money=money+1 where username="${username}";`
        exec.query(sql1, (err, result) => {
          if (err) {
            return err
          }
        })
      } else if (type.indexOf('b') != -1) {
        money = Number(money) + 1
      }

      let sql = `update user set money=${money} where username="${whoreceive}" ;`
      console.log(sql)
      exec.query(sql, (err, result) => {
        if (err) {
          console.log(err)
          return err
        }
        res.send({
          code: 1,
          istrue: '完成',
        })
      })
    }
  })
})
module.exports = isTrueRouter
