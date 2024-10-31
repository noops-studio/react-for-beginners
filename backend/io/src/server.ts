import { Server } from 'socket.io'
import config from 'config'

const server = new Server({
    cors: {
        origin: '*'
    }
})

server.on('connection', (socket) => {
    socket.onAny((eventName, payload) => {
        server.emit(eventName, payload)
    });
});

server.listen(config.get('server.port'))
console.log('io server started.')