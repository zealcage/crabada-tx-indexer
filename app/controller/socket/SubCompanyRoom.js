// const uuidv4 = require('uuid/v4')
const { v4: uuidv4 } = require('uuid');
const UserSocket = require('./UserSocket')

class SubCompanyRoom {
    // Constructor
    constructor(companyId, roomName) {
        this.roomId = uuidv4()
        this.roomName = companyId + '-' + roomName
        this.companyId = companyId
        this.timestamp = Date.now()
        this.onlineUsers = {}
        this.onlineCount = 0
    }

    addUser(user) {
        if (!this.onlineUsers[user.userId]) {
            this.onlineCount++;
            this.onlineUsers[user.userId] = user
        }
    }

    removeUser(socket) {
        this.onlineCount--;
        delete this.onlineUsers[socket.decoded.userId];
    }
}

module.exports = SubCompanyRoom;