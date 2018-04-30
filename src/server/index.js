'use strict'

const { Server } = require('uws')

const Dispatcher = require('./dispatcher')
const Room = require('./room')
const server = new Server({ port: 3000 })

const dispatcher = new Dispatcher(server)
const room = new Room(dispatcher)

server.on('connection', socket => {
  room.enter(socket)
})

setInterval(() => {
  server.clients.forEach(client => {
    room.heartbeat(client)
  })
}, 60000)
