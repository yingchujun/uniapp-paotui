// 导入express库
const express = require('express')
const bodyParser = require('body-parser')
const loginRouter = require('./indexRouter/login')
const registerRouter = require('./indexRouter/register')
const forgetRouter = require('./indexRouter/forget')
const emailtRouter = require('./indexRouter/email')
const verifyRouter = require('./indexRouter/verify')
const forgetcodeRouter = require('./indexRouter/forgetCode')
const publishRouter = require('./indexRouter/publish')
const orderInfoRouter = require('./indexRouter/getOrderInfo')
const questionRouter = require('./indexRouter/questions')
const checkoutRouter = require('./indexRouter/checkout')
const isTrueRouter = require('./indexRouter/isTrue')
// 创建express对象
const app = express()

//中间件呈递  配置post请求参数格式 放在post请求之前
// 接收 usernam=123456&password=123 格式
app.use(bodyParser.urlencoded({ extended: false }))
// 接收json格式
app.use(bodyParser.json())
app.use('/public', express.static('./public'))
// 注册路由
app.use('/api', [
  loginRouter,
  registerRouter,
  forgetRouter,
  emailtRouter,
  verifyRouter,
  forgetcodeRouter,
  publishRouter,
  orderInfoRouter,
  questionRouter,
  checkoutRouter,
  isTrueRouter,
])

//3.调用app.listen(端口，启动成功后的回调函数)  ， 启动服务器
app.listen(50, () => {
  console.log('express server running at http://127.0.0.1:50')
})
