'use client'

import { socket } from '@/components/socket'
import { useEffect } from 'react'

const GameLayout: React.FC<Children> = ({ children }) => {
  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])
  
  return children
}

export default GameLayout
