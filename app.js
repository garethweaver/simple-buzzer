const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const ip = require('ip')
require('dotenv-safe').config()
const { TEAMS, state } = require('./config/config')

app.set('view engine', 'pug')
app.use(express.static('public'))

require('./routes/index.js')(app)
require('./routes/admin.js')(app)
require('./routes/display.js')(app)

const setLocked = (isLocked, keepTo) => {
  if (!keepTo) {
    clearTimeout(state.timeout)
  }
  state.locked = isLocked
  state.locked ? io.emit('lock') : io.emit('clear')
}

io.on('connection', socket => {
  if (state.locked) {
    setLocked(true, true)
  }

  socket.on('buzz', team => {
    team.at = new Date().toISOString()
    // discard near concurrent buzzes after first buzz
    if (!state.locked) {
      setLocked(true)
      state.log.push(team)
      io.emit('buzz', { log: state.log, team })
      state.timeout = setTimeout(() => setLocked(false), 5000)
    }
  })

  socket.on('score', ({id, increment}) => {
    state.scores[id] += parseInt(increment)
    io.emit('scores', state.scores)
  })

  socket.on('clear', () => setLocked(false))
  socket.on('lock', () => setLocked(true))
})

server.listen(3003, () => {
  console.log(`
    http://${ip.address()}:3003
    http://localhost:3003
  `)
})
