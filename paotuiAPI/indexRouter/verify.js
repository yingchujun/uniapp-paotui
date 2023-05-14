// 引入 nodemailer
const express = require('express')
const mysql = require('mysql')
const config = require('../config')

const verifyRouter = express.Router() //创建路由对象

// 创建连接配置
const connection = mysql.createConnection(config.sqlConfig)
// 连接数据库
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }

  console.log('数据库连接成功5.')
})

//挂载用户路由
verifyRouter.post('/verify', function (req, res) {
  // 获取用户登录信息
  let username = req.body.username
  let code = req.body.code
  console.log('username', username)
  console.log('code', code)
  // sql语句
  let querryUser = `select * from register where username="${username}" and code="${code}"`
  // 执行sql
  connection.query(querryUser, (err, result) => {//回调函数，语句错误err 有结果就result
    if (err) {
      console.log('err', err)
      return
    }

    if (result.length == 0) {//在表里找不到匹配的username和code
      console.log('验证码错误')
      res.send({ state: 201, msg: '验证码错误' })
    } else {
      console.log('验证成功')
      res.send({ state: 200, msg: '验证成功' })
    }
  })
})

module.exports = verifyRouter
