import 'dotenv/config'

import express from 'express'
import http from 'http'

import SocketConnect from './socket/index.js'

const app = express()
const server = http.createServer(app)

SocketConnect(server)
app.use(express.json())

server.listen(8080, () => console.log('Server Run 🌍'))
