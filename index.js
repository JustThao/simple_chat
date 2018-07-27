const express = require('express')
const socket = require('socket.io')

const port = process.env.PORT || 4000

const app = express()

const server = app.listen(port, () => {
	console.log('app listen on', port)
})

// static files
app.use(express.static('public'))

// socket setup
const io = socket(server)

io.on('connection', socket => {
	console.log('socket connection made', socket.id)

	socket.on('chat', data => {
		io.sockets.emit('chat', data)
	})

	socket.on('typing', data => {
		socket.broadcast.emit('typing', data)
	})
})
