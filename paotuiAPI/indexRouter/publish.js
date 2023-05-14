const express = require('express')
const mysql = require('mysql')
const config = require('../config')
const uuid = require('node-uuid')

const publishRouter = express.Router() //创建路由对象

// 创建连接配置
const connection = mysql.createConnection(config.sqlConfig)
// 连接数据库
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }

  console.log('数据库连接成功7.')
})

//挂载用户路由
publishRouter.post('/publish', function (req, res) {
  console.log('发布中')
  // 获取用户登录信息
  const orderID = 'PPL' + uuid.v4().split('-')[0]
  const username = req.body.username
  const type = req.body.type
  const createTime = req.body.createTime
  const finishTime = req.body.finishTime
  const price = req.body.price
  const place = req.body.place
  const remark = req.body.remark
  console.log('username', req.body.username)
  // sql语句
  let querryUser = `insert into products values("${orderID}","${username}","${type}","${createTime}","${finishTime}","${price}","${place}","${remark}",null, 0,0)`
  console.log(querryUser)
  // 执行sql
  connection.query(querryUser, (err, result) => {
    if (err) {
      console.log('err', err)
      return err
    }

    if (result.length != 0) {
      if (type.indexOf('b') != -1) {
        let sql = `update user set money=money-1 where username="${username}"`
        console.log(sql)
        connection.query(sql, (err, result) => {
          if (err) return err
        })
      }
      res.send({ state: 200, msg: '发布成功' })
    }
  })
})

module.exports = publishRouter // 向外导出路由对象
