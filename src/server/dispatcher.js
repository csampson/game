'use strict'

const { OPEN: STATE_OPEN } = require('uws')

class Dispatcher {
  constructor (server) {
    this.server = server
  }

  sendClient (client, message) {
    if (client.readyState !== STATE_OPEN) {
      return
    }

    client.send(JSON.stringify(message))
  }

  sendOthers (sender, message) {
    this.server.clients.forEach(client => {
      if (client !== sender) {
        this.sendClient(client, message)
      }
    })
  }

  sendAll (message) {
    this.server.clients.forEach(client => {
      this.sendClient(client, message)
    })
  }
}

module.exports = Dispatcher
