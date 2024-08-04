'use client'

import React, { useEffect } from 'react'
import { socket } from '../layout'

interface Params {
  params: {
    id: string
  }
}

const Game: React.FC<Params> = ({ params: { id } }) => {
  useEffect(() => {
    socket.emit('join_room', { room: id })

    socket.on('hello_message', ({ message }) => {
      console.log(message)
    })

    return () => {
      socket.off('hello_message')
    }
  }, [id])

  return <div>Game</div>
}

export default Game
