'use strict'

const uuid = require('uuid/v4')

class Players {
  constructor () {
    this.id = uuid()
    this.position = { x: 0, y: 0 }
  }

  serialize () {
    return {
      id: this.id,
      position: this.position
    }
  }
}

module.exports = Players
