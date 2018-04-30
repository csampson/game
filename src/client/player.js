class Player {
  constructor (PIXI, x, y) {
    this.id = null
    this.avatar = PIXI.Sprite.fromImage('./bunny.png')
    this.avatar.anchor.x = 0.5
    this.avatar.anchor.y = 0.5
  }

  moveX (x) {
    this.avatar.position.x = x
  }

  moveY (y) {
    if (y) {
      this.avatar.position.y = y
    }
  }

  serialize () {
    return {
      id: this.id,
      position: {
        x: this.avatar.position.x,
        y: this.avatar.position.y
      }
    }
  }
}

export default Player
