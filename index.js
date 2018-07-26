const express = require('express')
const socket = require('socket.io')

const app = express()
const server = app.listen(4000, () => {
    console.log('app on port 4000')
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
})
