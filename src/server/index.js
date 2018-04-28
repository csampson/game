'use strict'

const { Server, OPEN: STATE_OPEN } = require('uws')

const Player = require('./player')
const server = new Server({ port: 3000 })

const Players = new Map()

server.on('connection', socket => {
  socket.player = new Player()
  Players.set(socket.player.id, socket.player)

  socket.on('pong', () => {
    socket.isAlive = true
  })

  socket.on('message', (message) => {
    console.log(message)

    server.clients.forEach(client => {
      if (client.readyState === STATE_OPEN) {
        client.send(message)
      }
    })
  })
})

server.broadcast = (message) => {
  server.clients.forEach(client => {
    if (client.readyState === STATE_OPEN) {
      client.send(message)
    }
  })
}

setInterval(() => {
  server.clients.forEach(client => {
    if (!client.isAlive) {
      Players.delete(client.player.id)
      client.terminate()

      return
    }

    client.isAlive = false
    client.ping(() => {})
  })
}, 30000)
