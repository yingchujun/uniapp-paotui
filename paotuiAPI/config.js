const sqlConfig = {
  host: '127.0.0.1', //主机
  user: 'root', // sql 账号
  password: 'root', // sql 密码
  database: 'paotui', // 需要连接的数据库名
  multipleStatements: true, // 支持执行多条sql语句
}
const url = 'http://localhost:50/public/'
module.exports = {
  sqlConfig,
  url,
}
