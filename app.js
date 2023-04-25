const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const ip = require('ip')
require('dotenv-safe').config()

const log = []
let locked = false
let to = null
const scores = { 'team-1': 0, 'team-2': 0 }

app.set('view engine', 'pug')
app.use(express.static('public'))

require('./routes/index.js')(app)
require('./routes/admin.js')(app)
require('./routes/display.js')(app)

const setLocked = (isLocked, keepTo) => {
  if (!keepTo) {
    clearTimeout(to)
  }
  locked = isLocked
  locked ? io.emit('lock') : io.emit('clear')
}

io.on('connection', socket => {
  if (locked) {
    setLocked(true, true)
  }

  socket.on('buzz', team => {
    team.at = new Date().toISOString()
    clearTimeout(to)
    log.push(team)
    setLocked(true)
    io.emit('buzz', { log, team })
    to = setTimeout(() => setLocked(false), 5000)
  })

  socket.on('score', ({id, increment}) => {
    scores[id] += parseInt(increment)
    io.emit('scores', scores)
  })

  socket.on('clear', () => setLocked(false))
  socket.on('lock', () => setLocked(true))
})

server.listen(3000, () => {
  console.log(`
    http://${ip.address()}:3000
    http://localhost:3000
  `)
})
