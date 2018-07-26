// make connection
const socket = io.connect('https://warm-headland-69021.herokuapp.com/')

// DOM
const $ = val => document.getElementById(val)

let message = $('message')
let handle = $('handle')
let btn = $('send')
let output = $('output')

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

// listen for events
socket.on('chat', data => {
    output.innerHTML +=
        '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
})
