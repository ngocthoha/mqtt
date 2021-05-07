//MQTT Broker
const aedes = require('aedes')()
const settings = {
    port: 1234
}

const broker = require('net').createServer(aedes.handle)

broker.listen(settings.port, () => {
    console.log("Broker started and listening on port ", settings.port);
})

aedes.on('publish', (packet, client)=>{
    if(client) {
        console.log('message: ', packet.payload.toString());
        
    }
})