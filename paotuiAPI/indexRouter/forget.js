const express = require('express')
const mysql = require('mysql')
const config = require('../config')

const forgetRouter = express.Router() //创建路由对象

// 创建连接配置
const connection = mysql.createConnection(config.sqlConfig)
// 连接数据库
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }

  console.log('数据库连接成功3.')
})

//挂载用户路由
forgetRouter.post('/forget', function (req, res) {
  // 获取用户登录信息
  username = req.body.username
  password = req.body.password
  console.log(username, password)
  // sql语句
  let querryUser = `update user set password="${password}" where username="${username}"  `
  console.log(querryUser)
  // 执行sql
  connection.query(querryUser, (err, result) => {
    if (err) {
      console.log('err', err)
      return
    }

    if (result.length != 0) {
      res.send({ state: 200, msg: '密码修改完成' })
      return
    }
  })
})

module.exports = forgetRouter // 向外导出路由对象
