const mysql = require('mysql')
const config = require('../config')

// 创建连接配置
const connection = mysql.createConnection(config.sqlConfig)
// 连接数据库
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }

  console.log('数据库连接成功3.')
})

module.exports = connection
