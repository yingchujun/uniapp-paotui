const express = require('express')
const exec = require('../mysql/index')
const { v4: uuid } = require('node-uuid')
const multer = require('multer')
const { url } = require('../config')
const storage = multer.diskStorage({
  // 上传路径
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    // var ext = path.extname(file.originalname)
    cb(null, uuid() + '.png')
  },
})

// 然后把配置赋给一个变量即可使用
let upload = multer({ storage })

const questionRouter = express.Router()
questionRouter.post('/question', upload.single('img'), (req, res) => {
  let { username, orderid, question, phone } = req.body
  const imgUrl = url + req.file.filename
  const sql = `insert into questions values("${username}","${orderid}","${question}","${imgUrl}","${phone}")`
  exec.query(sql, (err, result) => {
    if (err)
      return res.send({
        code: 0,
        err,
      })
    //
    res.send({
      code: 1,
      imgUrl,
    })
  })
})
module.exports = questionRouter
