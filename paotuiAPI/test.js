const mysql = require('mysql')

// c创建连接配置
const connection = mysql.createConnection({
  host: '127.0.0.1', //主机
  user: 'root', // sql 账号
  password: 'root', // sql 密码
  database: 'paotui', // 需要连接的数据库名
})

// 连接数据库
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }

  console.log('数据库连接成功.')
})

// sql语句
const name = 'sxy'
const querryUser = `select username from user where username="${name}" and password="180611"`
// 执行sql
connection.query(querryUser, (err, result) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(result)
})

// 关闭数据库连接 会在所有sql语句执行完后关闭
connection.end(function (err) {
  if (err) {
    return console.log('error:' + err.message)
  }
  console.log('数据库关闭')
})
