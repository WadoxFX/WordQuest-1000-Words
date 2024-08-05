import React from 'react'

import { useUsersInRoom } from '@/hooks/useUsersInRoom'

import Chat from './Chat'

import { Button } from '../ui'

interface ControllerProps {
  mySocket: string
  room: string
}

const Controller: React.FC<ControllerProps> = ({ mySocket, room }) => {
  const { quantity, loading } = useUsersInRoom(room)

  return (
    <div className="sticky top-8 h-[calc(100svh-64px)] grid grid-rows-[auto,max-content]">
      <Chat mySocket={mySocket} room={room} />

      <div className="flex justify-between items-end">
        <p>Players: {loading ? 'Loading...' : quantity}</p>
        <Button variant="outlined">Ready</Button>
      </div>
    </div>
  )
}

export default Controller
