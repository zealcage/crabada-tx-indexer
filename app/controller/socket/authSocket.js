const auth = require('./verifySocketToken');
const socketController = require('./socketController');

module.exports = (io) => {
    io.of('/api').use(function (socket, next) {
        if (socket.request.headers.cookie) {
            auth.verifySocketToken(socket).then(socket => {
                if (!socket) return next(new Error('Authentication error'));
                next();
            }).catch(err => {
                //console.log(err)
                next(new Error('Authentication error'));
            })
        } else {
            next(new Error('Authentication error'));
        }
    }).on('connection', function (socket) {
        console.log('a user connected with id %s', socket.id);
        socketController.respond(io, socket);
    });
};