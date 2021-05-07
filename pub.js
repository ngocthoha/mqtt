//MQTT subscriber
const mqtt = require('mqtt')

const settings = {
    username: "ngoctho25",
    key: "aio_Xwiz005igCDxDpwwbRJGrGy5X0dw",
    topic: "BBC_LED"
}

var url = `mqtts://${settings.username}:${settings.key}@io.adafruit.com`;
const client = mqtt.connect(url);


client.on('connect', ()=>{
    const data = {
        id: "3",
        name: "BBC LED",
        data: "4",
        date: new Date().toString()
    }
    const topic = `${settings.username}/feeds/${settings.topic}`
    client.publish(topic, JSON.stringify(data))
})
