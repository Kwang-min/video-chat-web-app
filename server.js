const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

const roomList = [];
const usersInRooms = {};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

function isEmpty(param) {
  return Object.keys(param).length === 0;
}

app.get('/test',(req,res) => {
  console.log('hello!')
})

app.post('/', (req, res) => {
  
  res.status(200).json({ success: true, roomId: uuidV4() })
})
app.post('/appendRoomList', (req, res) => {
  let roomInfo = {
    roomId: req.body.roomId,
    roomName: req.body.roomName,
    users: []
  }
  roomList.push(roomInfo)
  
})
app.post('/getRoomList', (req, res) => {
  res.status(200).json({ success: true, roomList: roomList })
})



io.of("/room").on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId)

    for (var i = 0; i < roomList.length; i++) {
      if (roomList[i]['roomId'] === roomId) {
        roomList[i]['users'].push(userId)
        
      }
    }
    io.of('/main').emit('join-user', roomList)

    socket.on('disconnect', () => {

      socket.broadcast.to(roomId).emit('user-disconnected', userId)
      
      for (var i = 0; i < roomList.length; i++) {
        //룸 리스트에서 해당 룸 찾아주고
        if (roomList[i]['roomId'] === roomId) {
          //룸 유저 목록에서 해당 유저 찾아서 지워주고   
          const length = roomList[i]['users'].length;
          for (var s = 0; s < length ; s++) {
            if (roomList[i]['users'][s] === userId) {
              roomList[i]['users'].splice(s, 1);
              //연결 끊긴 유저 지우고 나서 만약 남은 유저가 없으면 룸 삭제
              if (isEmpty(roomList[i]['users'])) {
                roomList.splice(i, 1);
              }
            }
          }

        }
      }
      
      io.of('/main').emit('disconnect-user', roomList)

    })

  })

})

server.listen(80)

