// const uuidv4 = require('uuid/v4')
const { v4: uuidv4 } = require('uuid');
const UserSocket = require('./UserSocket')
const SubCompanyRoom = require('./SubCompanyRoom')
const roomTypes = require('./roomTypes');

class CompanyRoom {
    // Constructor
    constructor(user, roomName) {
        this.creatorId = user.userId
        this.creatorName = user.firstName + ' ' + user.lastName
        this.roomId = uuidv4()
        this.roomName = user.companyId + '-' + roomName
        this.companyId = user.companyId
        this.companyLong = null
        this.subRooms = {}
        this.timestamp = Date.now()
        this.onlineUsers = {}
        this.onlineCount = 0
        this.addUser(user)
        this.addSubRooms()
    }

    async setRoomAttributes() {
        //console.log('Creating room ' + this.roomId);
        return {}
    }

    addSubRooms() {
        //typeof result[k] === "object"f
        const subRoom1 = new SubCompanyRoom(this.companyId, roomTypes.groups)
        //const subRoom2 = new SubCompanyRoom(this.companyId, roomTypes.dispatch.dispatchIn)
        //const subRoom3 = new SubCompanyRoom(this.companyId, roomTypes.order.orderAdded)
        //const subRoom4 = new SubCompanyRoom(this.companyId, roomTypes.order.orderEdited)

        this.subRooms[subRoom1.roomName] = subRoom1
        //this.subRooms[subRoom2.roomName] = subRoom2
        //this.subRooms[subRoom3.roomName] = subRoom3
        //this.subRooms[subRoom4.roomName] = subRoom4
    }

    addUserToSubRoom(user, subRoom) {
        for (var device in user.devices) {
            user.devices[device].socket.join(subRoom)
        }
        this.subRooms[subRoom].addUser(user)
    }

    getOnlineUsers(roomName) {
        if (roomName) {
            return {}
        } else {
            let returnObject = {}
            for (var user in this.onlineUsers) {
                returnObject[user] = { devices: this.onlineUsers[user].getDevicesWithoutSocket() }
            }
            return returnObject
        }
    }

    addUser(user, socket) {
        if (this.onlineUsers[user.userId]) {
            //const socketId = Object.keys(user.devices)[0]
            this.onlineUsers[user.userId].addDevice(socket)
        } else {
            this.onlineCount++;
            this.onlineUsers[user.userId] = user
        }
    }

    removeUser(socket) {
        if (this.onlineUsers[socket.decoded.userId].devices[socket.id]) {
            if (this.onlineUsers[socket.decoded.userId].deviceCount > 1) {
                this.onlineUsers[socket.decoded.userId].removeDevice(socket)
            } else {
                this.onlineUsers[socket.decoded.userId].setLastSeen();
                this.onlineCount--;
                delete this.onlineUsers[socket.decoded.userId];
                for (var subRoom in this.subRooms) {
                    if (this.subRooms[subRoom].onlineUsers[socket.decoded.userId])
                        this.subRooms[subRoom].removeUser(socket)
                }
            }
        }
    }
}

module.exports = CompanyRoom;