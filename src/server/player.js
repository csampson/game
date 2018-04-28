'use strict'

const uuid = require('uuid/v4')

class Players {
  constructor (socket) {
    this.id = uuid()
    this.position = { x: 0, y: 0 }
  }
}

module.exports = Players
