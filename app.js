var express = require('express');
var app = express();
const helmet = require('helmet')
const morgan = require("morgan")
const socketIO = require('socket.io')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const Redis = process.env.REDIS_HOST_0 ? require("ioredis") : require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const result = dotenv.config({ path: __dirname + '/.env' })

if (result.error) {
  throw result.error
}

console.log("IS_BETA: " + process.env.IS_BETA)
app.use(helmet())
app.use(morgan("dev"))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var http = require('http').createServer(app);

const io = socketIO(http, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: true,
  cors: {
    origin: process.env.NODE_ENV === 'development' ? [`http://${process.env.IPADD}:8000`] : [`https://nittime.com/app`, `http://${process.env.IPADD}:8000`, 'https://www.nittime.com'],
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }
});

console.log(new Date())

const cluster = process.env.REDIS_HOST_0 ? new Redis.Cluster([
  {
    port: 6379,
    host: process.env.REDIS_HOST_0,
  },
  {
    port: 6379,
    host: process.env.REDIS_HOST_1,
  },
  {
    port: 6379,
    host: process.env.REDIS_HOST_2,
  },
]) : Redis.createClient(6379, "127.0.0.1");

cluster.on('error', (err) => {
  console.log(err);
});

cluster.on('reconnecting', (res) => {
  console.log("Redis reconnecting")
})

cluster.on('ready', (err) => {
  console.log("%s\x1b[32m%s", 'Redis connection: ', 'success')
});

const subClient = cluster.duplicate();
io.adapter(createAdapter(cluster, subClient));

require('./app/router/router.js')(app, io, cluster);
// require('./app/controller/socket/authSocket')(io);
require('./app/cron/cronJobs.js')(io)
console.log("%s\x1b[32m%s\x1b[0m%s\x1b[32m%s", 'Server started in ', process.env.NODE_ENV, ' mode on port ', process.env.PORT)

http.listen(process.env.PORT, process.env.IPADD);