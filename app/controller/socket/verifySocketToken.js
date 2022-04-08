const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');
//var useragent = require('useragent');
var agentParser = require('ua-parser-js');
const cookieParser = require('cookie-parser');
let User = require('../../mongodbModel/user.model');

function getCookie(cookie, name){
    cookie = ";"+cookie;
    cookie = cookie.split("; ").join(";");
    cookie = cookie.split(" =").join("=");
    cookie = cookie.split(";"+name+"=");
    if(cookie.length<2){
        return null;
    }
    else{
        return decodeURIComponent(cookie[1].split(";")[0]);
    }
}

exports.verifySocketToken = async (socket, res, next) => {
    if (!socket.request.headers.cookie) {
        throw new Error('No token provided.')
    }
    
    jwt.verify(getCookie(socket.request.headers.cookie, "token"), config.secret, (err, decoded) => {
        if (err) {
            throw new Error('Fail to Authentication. Error -> ' + err)
        }
        socket.decoded = {}
        socket.decoded.username = decoded.username;
        socket.decoded.userId = decoded.userId;
        socket.decoded.companyId = decoded.companyId;
        socket.decoded.language = socket.handshake.headers['accept-language']
        socket.decoded.userAgent = socket.handshake.headers['user-agent']
        socket.decoded.address = socket.handshake.address
        try {
            const parsedObject = agentParser(socket.handshake.headers['user-agent'])
            console.log(parsedObject)
            socket.decoded.deviceInfo = {
                browser: parsedObject.browser,
                os: parsedObject.os,
                device: parsedObject.device
            }
        } catch (err) {
            console.log(err)
            socket.decoded.deviceInfo = {
                browser: {},
                os: {},
                device: {}
            }
        }
        //socket.decoded.deviceInfo = agent.device.toString();
    });
    return User.findOne({_id: socket.decoded.userId}).select("firstName lastName status").lean().then(user => {
        if (!user) {
            throw new Error("User Not Exist");
        }
        else if (user.status !== 1) {
            throw new Error("User Inactive");
        }
        socket.decoded.firstName = user.firstName;
        socket.decoded.lastName = user.lastName;
        return socket
    });
}
