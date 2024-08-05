import type { Server as HTTPserver } from 'http'
import { Server, Socket } from 'socket.io'

type SocketStuff = Socket & {
  room: string
}

interface Rooms {
  [key: string]: Room
}

class Room {
  rooms: Set<string> = new Set()

  add(id: string) {
    this.rooms.add(id)
  }

  remove(id: string) {
    this.rooms.delete(id)
  }

  hasUser(id: string): boolean {
    return this.rooms.has(id)
  }

  isEmpty(): boolean {
    return this.rooms.size === 0
  }

  playersInRoom(): string[] {
    return Array.from(this.rooms)
  }
}

const rooms: Rooms = {}
setInterval(() => console.log(rooms), 3000)

const SocketConnect = (server: HTTPserver) => {
  const io = new Server(server, {
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: true,
    },
    cors: {
      origin: [process.env.CLIENT_URL, 'http://192.168.1.4:3000'],
      credentials: true,
    },
  })

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
        rooms[room] = new Room()
      }

      rooms[room].add(socket.id)
      updatePlayersInRoom(room)
    })

    socket.on('message', ({ content, room }) => {
      socket.broadcast
        .to(room)
        .emit('get_message', { socket: socket.id, content })
    })

    socket.on('get_players_in_room', ({ room }) => {
      updatePlayersInRoom(room)
    })

    socket.on('disconnect', (reason) => {
      console.log(`User ${socket.id} reason: ${reason}`)

      if (socket.room && rooms[socket.room]) {
        rooms[socket.room].remove(socket.id)
        updatePlayersInRoom(socket.room)

        if (rooms[socket.room].isEmpty()) {
          delete rooms[socket.room]
        }
      }
    })
  })
}

export default SocketConnect
