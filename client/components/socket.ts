import { io } from 'socket.io-client'

export const socket = io('http://192.168.1.4:8080', {
  transports: ['websocket'],
  upgrade: false,
})
