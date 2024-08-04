'use client'

import { useEffect, useState } from 'react'
import { socket } from '../layout'
import { useIdSocket } from '@/hooks/useIdSocket'
import ChoiceWords from '@/components/words/ChoiceWords'

interface Params {
  params: {
    id: string
  }
}

const Game: React.FC<Params> = ({ params: { id } }) => {
  const [game, setGame] = useState<boolean>(false)
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

  if (!game) {
    return (
      <main className="px-8 pt-8">
        <ChoiceWords />
        <div>Accept</div>
      </main>
    )
  }

  return <div>Game {userId}</div>
}

export default Game
