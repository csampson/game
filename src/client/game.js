import Player from './player.js'

class Game {
  constructor (PIXI, screen) {
    this.PIXI = PIXI
    this.screen = screen
    this.stage = new PIXI.Container()
    this.players = new Map()
    this.localPlayer = null

    this.renderer = PIXI.autoDetectRenderer(screen.clientWidth, screen.clientHeight, {
      backgroundColor: 0x1099bb
    })
  }

  animate () {
    window.requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.stage)
  }

  spawn (attrs, options = { isLocal: false }) {
    const player = new Player(this.PIXI)

    player.id = attrs.id

    if (options.isLocal) {
      player.moveX(200)
      player.moveY(this.renderer.plugins.interaction.mouse.global.y)

      this.localPlayer = player
    } else {
      player.avatar.position.x = attrs.position.x
      player.avatar.position.y = attrs.position.y
    }

    this.players.set(player.id, player)
    this.stage.addChild(player.avatar)
  }

  remove (id) {
    const player = this.players.get(id)

    this.stage.removeChild(player.avatar)
    this.players.delete(id)
  }
}

export default Game
