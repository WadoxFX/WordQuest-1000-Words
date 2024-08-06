import { Server, Socket } from 'socket.io'
import type { Server as HTTPserver } from 'http'

import Room from './room.js'

import { settings } from './setting.js'

type SocketStuff = Socket & {
  room: string
}

const rooms: { [key: string]: Room } = {}
// setInterval(() => console.log(JSON.stringify(rooms, null, 2)), 1000)

const SocketConnect = (server: HTTPserver) => {
  const io = new Server(server, settings)

  io.on('connection', (socket: SocketStuff) => {
    console.log(`User ${socket.id} connected`)

    const updatePlayersInRoom = (room: string) => {
      const quantity = rooms[room]?.playersInRoom().length || 0
      io.to(room).emit('players_in_room', { quantity })
    }

    socket.on('join_room', ({ room }) => {
      socket.room = room
      socket.join(room)

      if (!rooms[room]) {
        rooms[room] = new Room(socket.id)
      } else {
        rooms[room].addPlayer(socket.id)
      }

      socket.broadcast
        .to(room)
        .emit('join_message', { message: `User ${socket.id.slice(-4)} joined the room` })
      updatePlayersInRoom(room)
    })

    socket.on('send_message', ({ content, room }) => {
      socket.broadcast.to(room).emit('get_message', { socket: socket.id, content })
    })

    socket.on('get_players_in_room', ({ room }) => {
      updatePlayersInRoom(room)
    })

    socket.on('send_words', ({ words }) => {
      rooms[socket.room].addWords(socket.id, words)
    })

    socket.on('disconnect', (reason) => {
      console.log(`User ${socket.id} reason: ${reason}`)

      if (socket.room && rooms[socket.room]) {
        socket.broadcast
          .to(socket.room)
          .emit('join_message', { message: `User ${socket.id.slice(-4)} leaves the room` })

        updatePlayersInRoom(socket.room)
        socket.leave(socket.room)

        rooms[socket.room].remove(socket.id)

        if (rooms[socket.room].isEmpty()) {
          delete rooms[socket.room]
        }
      }
    })
  })
}

export default SocketConnect
