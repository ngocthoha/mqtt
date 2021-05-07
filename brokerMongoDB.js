//MQTT Broker
const aedes = require('aedes')()
const settings = {
    port: 1234
}
const broker = require('net').createServer(aedes.handle)

// const httpServer = require('http').createServer()
// const ws = require('websocket-stream')
// const wsPort = 8888
// ws.createServer({
//     server: httpServer
// }, aedes.handle)
// httpServer.listen(wsPort, function () {
//     console.log('websocket server listening on port', wsPort)
// })

const mongo = require('mongodb')
const MongoClient  = mongo.MongoClient
const url = "mongodb://localhost:27017/"

broker.listen(settings.port, () => {
    console.log("Broker started and listening on port ", settings.port);
})

aedes.on('publish', (packet, client)=>{
    if(client) {
        msg = packet.payload.toString()
        console.log('message: ', msg);
        MongoClient.connect(url, (err, client) => {
            var colt = client.db('MQTT').collection('msg')
            colt.insertOne({
                message: msg
            }, () => {
                console.log("Data is saved to MongoDB");
                client.close();
            })
        })
    }
})