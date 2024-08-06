'use client'

import { useEffect, useState } from 'react'

import ChoiceWords from '@/components/words/ChoiceWords'
import Controller from '@/components/game/Controller'
import { socket } from '@/components/socket'
import { useIdSocket } from '@/hooks/useIdSocket'

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
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-svh">Loading...</div>
    )
  }

  if (!game) {
    return (
      <main className="px-8 pt-8 gap-5 grid grid-cols-[auto,max-content]">
        <ChoiceWords />
        <Controller mySocket={userId as string} room={id} />
      </main>
    )
  }

  return <div>Game {userId}</div>
}

export default Game
