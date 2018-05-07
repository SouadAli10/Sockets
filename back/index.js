const catNames = require('cat-names');
const http = require('http')
const server = http.createServer()

const handleRequest = (req, res) => {
  res.end('ok')
}

server.on('request', handleRequest)
server.listen(8888, () => console.log(`server is ready`))

const io = require('socket.io')(server);

let globalNumber = 0

io.on('connection', (socket) => {
  const username = catNames.random()

  console.log('a user connected')
  io.emit('user:new', username)
  socket.emit('user:me', username)

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('increment', () => {
    globalNumber++
    io.emit('number:change', globalNumber)
  });

  socket.on('decrement', () => {
    globalNumber--
    io.emit('number:change', globalNumber)
  });

  socket.emit('number:change', globalNumber)

  socket.on('text', (message, username) => {
    console.log(message)
    io.emit('text:everyone', message, username)
  })

});