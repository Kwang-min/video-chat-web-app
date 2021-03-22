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

app.post('/', (req, res) => {
  res.status(200).json({ success: true, roomId : uuidV4() })
})
app.post('/appendRoomList', (req, res) => {
    roomList.push(req.body.roomId)
    io.of('/main').emit('make-room', roomList)
})
app.post('/getRoomList', (req, res) => {
    res.status(200).json({ success: true, roomList: roomList })
})



io.of("/room").on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId)

    if(usersInRooms[roomId] == undefined ) {
        usersInRooms[roomId] = {};
        usersInRooms[roomId][userId] = userId;
    } else {
        usersInRooms[roomId][userId] = userId;
    }


    socket.on('disconnect', () => {
      
      socket.broadcast.to(roomId).emit('user-disconnected', userId)
      delete usersInRooms[roomId][userId]

      if(isEmpty(usersInRooms[roomId])) {

        for(let i = 0; i < roomList.length; i++) {
          if(roomList[i] === roomId)  {
            roomList.splice(i, 1);
            i--;
          }
        }
      }

      io.of('/main').emit('delete-room', roomList)

    })

  })

})

server.listen(8000)

