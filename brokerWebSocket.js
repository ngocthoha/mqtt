const httpServer = require('http').createServer()
const ws = require('websocket-stream')
const wsPort = 8888

ws.createServer({
    server: httpServer
}, aedes.handle)

httpServer.listen(wsPort, function () {
    console.log('websocket server listening on port', wsPort)
})

