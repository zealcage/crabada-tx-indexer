const RoomController = require('./roomController');
const roomTypes = require('./roomTypes');
const UserSocket = require('./UserSocket')
var onlineUsers = {};

function removeSocket(user, socket) {
  if (user.deviceCount > 1)
    RoomController.leaveRoom(socket, roomTypes.public)
  else {
    delete onlineUsers[socket.decoded.userId];
    RoomController.leaveRoom(socket, roomTypes.public)
  }
}

module.exports.respond = function (io, socket) {
  socket.join(roomTypes.public)
  socket.join(`${socket.decoded.companyId}-${roomTypes.public}`)
  //let rooms = Object.keys(socket.rooms);
  let user = null
  if (!onlineUsers[socket.decoded.userId])
    user = new UserSocket(socket)
  else {
    user = onlineUsers[socket.decoded.userId]
  }
  RoomController.joinRoom(user, roomTypes.public, socket)
  RoomController.joinSubRoom(user, roomTypes.groups)

  onlineUsers[user.userId] = user
  RoomController.showRooms()
  // socket.broadcast.to(`${socket.decoded.companyId}-${roomTypes.dispatch.dispatchOut}`)
  //   .emit('notification', { message: `${user.firstName} ${user.lastName} çevrimiçi` });


  socket.on('getOnlineUsersByCompany', () => {
    try {
      let users = RoomController.showRoomByCompanyId(socket.decoded.companyId)
      socket.emit('onlineUsers', users);
    } catch (err) {
      console.log(err)
    }
  })

  socket.on('disconnect', () => {
    removeSocket(onlineUsers[socket.decoded.userId], socket)
    console.log(onlineUsers)
    console.log(RoomController.showRooms())
  })
}

module.exports.onlineUsers = onlineUsers