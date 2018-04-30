'use strict'

import Game from './game.js'

const SERVER_URL = 'ws://192.168.86.54:3000'

const server = new window.WebSocket(SERVER_URL)
const screen = document.querySelector('.screen')

let game

server.onopen = (event) => {
  game = new Game(window.PIXI, screen)

  screen.setAttribute('data-status', 'ready')
  screen.appendChild(game.renderer.view)
  game.animate()

  game.renderer.view.addEventListener('pointermove', event => {
    const player = game.localPlayer
    player.moveY(event.offsetY)

    server.send(JSON.stringify({
      type: 'PLAYER_MOVE',
      payload: {
        player: player.serialize()
      }
    }))
  })
}

server.onmessage = (event) => {
  const { type, payload } = JSON.parse(event.data)

  switch (type) {
    case 'GAME_CONNECT':
      game.spawn(payload.player, { isLocal: true })
      payload.players.forEach(attrs => {
        if (attrs.id !== game.localPlayer.id) {
          game.spawn(attrs)
        }
      })

      break
    case 'PLAYER_JOIN':
      game.spawn(payload.player)

      break
    case 'PLAYER_MOVE':
      if (!game.players.has(payload.player.id)) {
        game.spawn(payload.player)
      }

      game.players.get(payload.player.id).moveY(payload.player.position.y)

      break
    case 'PLAYER_LEAVE':
      game.remove(payload.player)

      break
  }
}
