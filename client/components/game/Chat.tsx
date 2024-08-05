import React, { useEffect, useState } from 'react'
import { Button } from '../ui'
import { socket } from '@/app/(game)/game/layout'

interface ChatProps {
  mySocket: string
  room: string
}

interface Message {
  socket: string
  content: string
}

const Chat: React.FC<ChatProps> = ({ mySocket, room }) => {
  const [content, setContent] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const getMessage = ({ socket, content }: Message) => {
      setMessages((prev: Message[]) => [...prev, { socket, content }])
    }
    
    const getHelloMessage = ({ message }: { message: string }) => {
      setMessages((prev: Message[]) => {
        if (
          prev.some((msg) => msg.socket === 'Game' && msg.content === message)
        ) {
          return prev
        }
        return [...prev, { socket: 'Game', content: message }]
      })
    }

    socket.on('hello_message', getHelloMessage)
    socket.on('get_message', getMessage)

    return () => {
      socket.off('hello_message', getHelloMessage)
      socket.off('get_message', getMessage)
    }
  }, [room])

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (content.length) {
      socket.emit('message', { content, room })

      setMessages((prev: Message[]) => [...prev, { socket: mySocket, content }])
      setContent('')
    }
  }

  return (
    <div>
      <ul className="flex flex-col gap-3 p-3 overflow-auto h-[300px] border border-black w-[460px]">
        {messages.length ? (
          messages.map((message, index) => (
            <li
              className="bg-slate-100 w-max p-2 rounded-lg max-w-[-webkit-fill-available] break-words"
              key={`${message.socket}-${index}`}
            >
              {message.socket === mySocket
                ? `You: ${message.content}`
                : `${message.socket.slice(-4)}: ${message.content}`}
            </li>
          ))
        ) : (
          <li>
            <p>No Messages</p>
          </li>
        )}
      </ul>

      <form className="mt-2 border border-black flex justify-between">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-3 w-full outline-none"
          placeholder="Message..."
        />
        <Button onClick={sendMessage} className="p-3">
          Send
        </Button>
      </form>
    </div>
  )
}

export default Chat
