import { socket } from '@/components/socket'
import { useEffect, useState } from 'react'

export const useIdSocket = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getSocketId = () => {
      if (socket.id) {
        setUserId(socket.id)
        setLoading(false)
      }
    }

    socket.on('connect', getSocketId)

    return () => {
      socket.off('connect', getSocketId)
    }
  }, [])

  return { userId, loading }
}
