const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

const roomList = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.post('/', (req, res) => {
  res.status(200).json({ success: true, roomId : uuidV4() })
})
app.post('/appendRoomList', (req, res) => {
    roomList.push(req.body.roomId)
    console.log(roomList)
})
app.post('/getRoomList', (req, res) => {
    res.status(200).json({ success: true, roomList: roomList })
})



io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    console.log('join-room:', roomId, userId)
    socket.join(roomId)
    
    socket.broadcast.to(roomId).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', userId)
    })
  })
})

server.listen(8000)

