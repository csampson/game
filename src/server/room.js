const Player = require('./player')

const GAME_CONNECT = 'GAME_CONNECT'
const PLAYER_JOIN = 'PLAYER_JOIN'
const PLAYER_LEAVE = 'PLAYER_LEAVE'

class Room {
  constructor (dispatcher) {
    this.dispatcher = dispatcher
    this.players = new Map()
  }

  enter (client) {
    client.isAlive = true
    client.player = new Player()
    this.players.set(client.player.id, client.player)

    client.on('close', () => {
      this.dispatcher.sendOthers(client, {
        type: PLAYER_LEAVE,
        payload: {
          player: client.player.serialize()
        }
      })

      this.players.delete(client.player.id)
    })

    client.on('message', message => {
      this.dispatcher.sendOthers(client, message)
    })

    client.on('pong', () => {
      client.isAlive = true
    })

    this.dispatcher.sendClient(client, {
      type: GAME_CONNECT,
      payload: {
        player: client.player.serialize(),
        players: [...this.players.values()]
      }
    })

    this.dispatcher.sendOthers(client, {
      type: PLAYER_JOIN,
      payload: {
        player: client.player.serialize()
      }
    })
  }

  heartbeat (client) {
    if (!client.isAlive) {
      this.players.delete(client.player.id)
      client.terminate()

      return
    }

    client.isAlive = false
    client.ping(() => {})
  }
}

module.exports = Room
