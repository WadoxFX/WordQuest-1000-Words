'use client'

import { useEffect } from 'react'
import { socket } from '../layout'
import { useIdSocket } from '@/hooks/useIdSocket'

interface Params {
  params: {
    id: string
  }
}

const Game: React.FC<Params> = ({ params: { id } }) => {
  const { userId, loading } = useIdSocket()

  useEffect(() => {
    socket.emit('join_room', { room: id })

    const getHelloMessage = ({ message }: { message: string }) => {
      console.log(message)
    }

    socket.on('hello_message', getHelloMessage)

    return () => {
      socket.off('hello_message', getHelloMessage)
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-svh">Loading...</div>
    )
  }

  return <div>Game {userId}</div>
}

export default Game
