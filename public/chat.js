// make connection
const socket = io.connect('localhost:4000')
// const socket = io.connect('https://warm-headland-69021.herokuapp.com/')

// DOM
const $ = val => document.getElementById(val)

let message = $('message')
let handle = $('handle')
let btn = $('send')
let output = $('output')
let feedback = $('feedback')

// send message and handle to server
btn.onclick = e => {
	e.preventDefault()
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	})
}

if (handle.value === '') {
	message.disabled = true
}

handle.onkeyup = () => {
	message.disabled = false
	message.style.backgroundColor = 'lightblue'
	if (handle.value === '') {
		message.disabled = true
		message.style.backgroundColor = 'darkgrey'
	}
}

// send typing event to server
message.onkeypress = () => {
	socket.emit('typing', handle.value)
}

// listen for events
socket.on('chat', data => {
	feedback.innerHTML = ''
	output.innerHTML +=
		'<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
})

socket.on('typing', data => {
	feedback.innerHTML += '<p><em>' + data + ' is typing a message...</em></p>'
})
