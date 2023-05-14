// 引入 nodemailer
const nodemailer = require('nodemailer')
const express = require('express')
const mysql = require('mysql')
const config = require('../config')

const emailtRouter = express.Router() //创建路由对象

// 创建连接配置
const connection = mysql.createConnection(config.sqlConfig)
// 连接数据库
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }

  console.log('数据库连接成功4.')
})

//挂载用户路由
emailtRouter.post('/email', function (req, res) {
  // 获取用户登录信息
  username = req.body.username
  password = req.body.password
  code = req.body.code

  // sql语句
  let querryUser = `select * from user where username="${username}" `
  // 执行sql
  connection.query(querryUser, (err, result) => {
    if (err) {
      console.log('err', err)
      return
    }
    if (result.length == 0) {
      console.log('发送验证码')
      // 创建一个SMTP客户端配置
      let config = {
        host: 'smtp.qq.com', // 配置 邮件服务器的SMTP地址
        port: 25,
        auth: {
          user: '2667294812@qq.com', //刚才注册的邮箱账号
          pass: 'kzktcxzesbwhdiif', //邮箱的授权码，不是注册时的密码
        },
      }

      // 创建一个SMTP客户端对象
      var transporter = nodemailer.createTransport(config)

      // 发送邮件
      const sendEmail = function (mail) {
        transporter.sendMail(mail, function (error, info) {
          if (error) {
            console.log(error)
            return error
          }
        })
      }

      // 创建一个邮件对象
      let randomNum = Math.random().toFixed(6).slice(-6)//随机生成六位数验证码,四舍五入取到小数点后六位数,从数组的尾部选取6个元素
      var mail = {
        // 发件人
        from: '2667294812@qq.com',
        // 主题
        subject: '楚师跑腿验证码',
        // 收件人
        to: username,
        // 邮件内容，HTML格式
        text: `欢迎注册楚师跑腿，验证码为：${randomNum}，有效期为5分钟`,
      }

      let addCode = ` insert into register set  username="${username}", code="${randomNum}" `
      console.log(randomNum)
      connection.query(addCode, (err, result) => {//回调函数，语句错误err 有结果就result
        if (err) {
          console.log(err)
          return
        }
      })

      sendEmail(mail)
      return res.send({ state: 200, msg: '验证码发送成功' })
    }

    res.send({ state: 201, msg: '验证码发送失败，请重新尝试' })
  })
})

module.exports = emailtRouter
