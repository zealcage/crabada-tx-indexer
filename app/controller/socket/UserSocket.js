let User = require('../../mongodbModel/user.model');

class UserDevice {
    // Constructor
    constructor(socket) {
        this.id = socket.id
        this.address = socket.decoded.address
        this.language = socket.decoded.language
        this.userAgent = socket.decoded.userAgent
        this.deviceInfo = socket.decoded.deviceInfo
        this.socket = socket
        this.createdAt = Date.now()
    }
}

class UserSocket {
    // Constructor
    constructor(socket) {
        this.userId = socket.decoded.userId
        this.firstName = socket.decoded.firstName
        this.lastName = socket.decoded.lastName
        this.companyId = socket.decoded.companyId
        this.devices = {}
        this.deviceCount = 0
        this.createdAt = Date.now()
        this.addDevice(socket)
    }

    addDevice(socket) {
        this.devices[socket.id] = new UserDevice(socket)
        this.deviceCount++
    }

    removeDevice(socket) {
        delete this.devices[socket.id]
        this.deviceCount--
    }

    getDevicesWithoutSocket() {
        let returnObject = []
        for (var device in this.devices) {
            returnObject.push({ device: this.devices[device].deviceInfo })
        }
        return returnObject
    }

    async setLastSeen() {
        User.updateOne({ _id: this.userId }, { lastSeen: Date.now() })
    }
}

module.exports = UserSocket;