import React from 'react'
import Stage from '../stage'

const SERVER_URL = 'ws://192.168.86.54:3000'
const server = new window.WebSocket(SERVER_URL)

class Game extends React.Component {
  componentDidMount () {
    server.onopen = (event) => {
      // ...
    }
  }

  render () {
    return (
      <Stage />
    )
  }
}

export default Game
