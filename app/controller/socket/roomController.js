const CompanyRoom = require('./CompanyRoom');

const roomController = { rooms: {}, roomCount: 0 };

roomController.joinRoom = (user, roomName, socket) => {
    const room = user.companyId + '-' + roomName
    if (!roomController.rooms[room]) {
        const newRoom = new CompanyRoom(user, roomName)
        //console.log('New room object created', newRoom);
        newRoom.setRoomAttributes()
        roomController.rooms[newRoom.roomName] = newRoom;
        roomController.roomCount += 1;

        return newRoom;
    } else {
        roomController.rooms[room].addUser(user, socket)
    }
};

roomController.joinSubRoom = (user, subRoomName) => {
    const room = user.companyId + '-' + 'public'
    const subRoom = user.companyId + '-' + subRoomName

    if (roomController.rooms[room]) {
        roomController.rooms[room].addUserToSubRoom(user, subRoom)
    } else {
        console.error("ROOM NOT FOUND")
    }
};

roomController.leaveRoom = (socket, roomName) => {
    const room = socket.decoded.companyId + '-' + roomName
    if (!roomController.rooms[room]) {
        console.error("No room found")
    } else {
        roomController.rooms[room].removeUser(socket)
    }
};
roomController.showRooms = () => console.log(roomController.rooms)
roomController.showRoomByCompanyId = (companyId) => {
    try {
        if (roomController.rooms && roomController.rooms[`${companyId}-public`]) {
            const companyRoom = roomController.rooms[`${companyId}-public`]
            const returnObject = {
                onlineCount: companyRoom.onlineCount,
                onlineUsers: companyRoom.getOnlineUsers(),
            }
            return returnObject
        } else return {}
    } catch (err) {
        console.log(err)
    }
}
roomController.findRoom = (roomId) => roomController.rooms[roomId];

module.exports = roomController;