//MQTT subscriber
const mqtt = require('mqtt')
const settings = {
    username: "ngoctho25",
    key: "aio_Xwiz005igCDxDpwwbRJGrGy5X0dw",
    topic: "BBC_LED"
}

const mongo = require('mongodb')
const MongoClient  = mongo.MongoClient
const url = "mongodb://localhost:27017/"

var urlServer = `mqtts://${settings.username}:${settings.key}@io.adafruit.com`;
const client = mqtt.connect(urlServer)

client.on('connect', ()=>{
    const topic = `${settings.username}/feeds/${settings.topic}`
    client.subscribe(topic)
})

client.on('message', (topic, message) => {
    const pos = topic.lastIndexOf("/");
    const device = topic.slice(pos + 1);
    const obj = JSON.parse(message);
    MongoClient.connect(url, (err, client) => {
        var colt = client.db('MQTT').collection('msg')
        
        colt.insertOne({
            device: device,
            value: obj.data,
            date: obj.date
        }, () => {
            console.log("Data is saved to MongoDB");
            client.close();
        })
    })
    console.log("msg: " + message.toString() + " to topic: " + topic);
})
