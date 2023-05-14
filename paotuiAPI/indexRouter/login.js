const express = require('express')
const mysql = require('mysql')
const config = require('../config')

const loginRouter = express.Router() //创建路由对象

// 创建连接配置
const connection = mysql.createConnection(config.sqlConfig)
// 连接数据库
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }

  console.log('数据库连接成功1.')
})

//挂载用户路由
loginRouter.post('/login', function (req, res) {
  // 获取用户登录信息
  username = req.body.username
  password = req.body.password

  // sql语句
  let querryUser = `select * from user where username="${username}" and password="${password}" `
  console.log(querryUser)
  // 执行sql
  connection.query(querryUser, (err, result) => {
    if (err) {
      console.log('err', err)
      return
    }

    if (result.length != 0) {
      res.send({ state: 200, msg: '登录成功', result })
      return
    }

    res.send({ state: 201, msg: '账号密码错误' })
  })
})

module.exports = loginRouter // 向外导出路由对象
