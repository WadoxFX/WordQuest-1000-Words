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
      origin: [process.env.CLIENT_URL],
      credentials: true,
    },
  })

  io.on('connection', (socket: SocketStuff) => {
    console.log(`User ${socket.id} connected`)

    socket.on('join_room', ({ room }) => {
      socket.room = room
      socket.join(room)

      if (!rooms[room]) {
        rooms[room] = new Room()
      }

      rooms[room].add(socket.id)
      socket.broadcast.to(room).emit('hello_message', { message: `Joined new user ${socket.id}` })
    })

    socket.on('disconnect', (reason) => {
      console.log(`User ${socket.id} reason: ${reason}`)

      if (socket.room && rooms[socket.room]) {
        rooms[socket.room].remove(socket.id)

        if (rooms[socket.room].isEmpty()) {
          delete rooms[socket.room]
        }
      }
    })
  })
}

export default SocketConnect
