import React from 'react'

import { useUsersInRoom } from '@/hooks/useUsersInRoom'
import { useWords } from '@/store/useWords'

import Chat from './Chat'

import { Button } from '../ui'
import { socket } from '../socket'

interface ControllerProps {
  mySocket: string
  room: string
}

const Controller: React.FC<ControllerProps> = ({ mySocket, room }) => {
  const { quantity, loading } = useUsersInRoom(room)
  const { words, onClear } = useWords()

  const handlerWords = () => {
    socket.emit('send_words', { words })
    onClear()
  }

  return (
    <div className="sticky top-8 h-[calc(100svh-64px)] grid grid-rows-[auto,max-content]">
      <Chat mySocket={mySocket} room={room} />

      <div className="flex justify-between items-end">
        <p>Players: {loading ? 'Loading...' : quantity}</p>
        <Button onClick={handlerWords} variant="outlined">
          Ready
        </Button>
      </div>
    </div>
  )
}

export default Controller
