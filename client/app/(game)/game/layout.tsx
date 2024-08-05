'use client'

import { useEffect } from 'react'
import { io } from 'socket.io-client'

export const socket = io('http://192.168.1.4:8080')

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
