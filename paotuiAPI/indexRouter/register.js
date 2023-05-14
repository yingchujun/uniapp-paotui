const express = require('express')
const mysql = require('mysql')
const { sqlConfig } = require('../config')

const registerRouter = express.Router() //创建路由对象

// 创建连接配置
const connection = mysql.createConnection(sqlConfig)
// 连接数据库
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }

  console.log('数据库连接成功2.')
})

//挂载用户路由
registerRouter.post('/register', function (req, res) {
  // 获取用户登录信息
  username = req.body.username
  password = req.body.password
  code = req.body.code
  // sql语句
  let querryUser = `select * from user  where username="${username}";`
  // 执行sql
  connection.query(querryUser, (err, result) => {
    if (err) {
      console.log('err', err)
      // res.send({ state: 201, msg: '账号已注册或验证码错误' })
      return
    }

    if (result.length == 0) {
      let queryCode = `select * from register where username="${username}" and code="${code}"`
      connection.query(queryCode, (err, result) => {//回调函数，语句错误err 有结果就result
        if (err) {
          console.log(err)
          return
        }
        if (result.length != 0) {
          let registerUser = `INSERT INTO user set username="${username}", password="${password}", money=3`
          connection.query(registerUser, (err, result) => {
            if (err) {
              console.log(err)
              return
            }
            res.send({ state: 200, msg: '注册成功' })
            return
          })
        } else {
          res.send({ state: 201, msg: '验证码错误' })
          return
        }
      })
      return
    } else {
      res.send({ state: 201, msg: '账号已注册' })
    }
  })
})

module.exports = registerRouter // 向外导出路由对象
