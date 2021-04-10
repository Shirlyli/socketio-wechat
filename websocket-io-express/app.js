// 创建http服务
var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server, { cors: true })
var count = 0 
var userList = [] //存储所有用户数据
var socketName = {} //存储当前用户信息
server.listen(3000, () => {
  console.log('连接服务器成功')
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})


io.on('connection', function (socket) {
  console.log('有用户连接了')
  socket.emit('func1', { data: 'hello world!' })
  socket.on('func2', data => {
    console.log(data)
  })

  socket.on('compile', () => {
    socket.emit('response', { data: 'ok' })
  })

  // 监听用户登陆事件
  socket.on('loginin', data => {
    var index = userList.find(item => item.username === data.username)
    if (index) {
      // 表示用户存在，登陆失败
      socket.emit('loginFail', { msg: '登陆失败,用户名已存在' })
    } else {
      count++
      socketName = data
      // 加入用户列表
      userList.push(data)
      console.log(userList)
      // 表示用户不存在，登陆成功,告诉当前用户
      socket.emit('loginSuccess', { data })
      // 告诉所有用户有新用户登陆进来了，广播用户
      io.emit('addUser', data)

      // 告诉所有用户当前有多少人登陆了
      io.emit('userList', userList)
    }
  })

  // 监听用户断开连接
  socket.on('disconnect', () => {
    // 将当前用户从userlist中删除
    let idx = userList.findIndex(item => item.username === socketName.username)
    userList.splice(idx, 1)
    //告诉所有人诱人离开了聊天室
    io.emit('deluser', {
      username: socketName.username,
      imgVal: socketName.imgVal,
      type: 'del'
    })
    // 告诉所有人，userlist发生了更新
    io.emit('userList', userList)
  })

  // 监听聊天功能
  socket.on('sendMsg',(data)=>{
    console.log(data)
    // 广播给所有用户
    io.emit('receiveMsg',data)
  })

})