import { Server } from 'socket.io'
import config from 'config'

const server = new Server({
    cors: {
        origin: '*'
    }
})

server.on('connection', (socket) => {
    console.log('new connection')
    socket.onAny((eventName, payload) => {
        console.log(eventName, payload)
        server.emit(eventName, payload)
    });
});

server.listen(config.get('server.port'))
console.log('io server started.')