import { socket } from '@/components/socket'
import { useEffect, useState } from 'react'

export const useUsersInRoom = (room: string) => {
  const [quantity, setQuantity] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  console.log(loading, quantity)

  let intervalId

  if (quantity === 0) {
    intervalId = setInterval(() => {
      socket.emit('get_players_in_room', { room })
    }, 1000)
  }

  clearInterval(intervalId)

  useEffect(() => {
    const updatePlayersNum = ({ quantity }: { quantity: number }) => {
      if (quantity !== 0) {
        setQuantity(quantity)
        setLoading(false)
      }
    }

    socket.on('players_in_room', updatePlayersNum)

    return () => {
      socket.off('players_in_room', updatePlayersNum)
    }
  }, [])

  return { quantity, loading }
}
