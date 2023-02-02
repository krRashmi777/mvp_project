const amqplib = require("amqplib")
const { v4: uuid4 } = require("uuid")
// const { APIError } = require("./app-errors")
// const { env } = require("../utils/common")

let amqplibConnection = null

// create channel
// establish connect to rabbitmq server
const getChannel = async () => {
    try {
        // connect to rabbitmq server
        // amqplibConnection is null, then make connection to rabbitmq
        if (amqplibConnection == null) {
            amqplibConnection = await amqplib.connect("amqp://localhost")
        }
        // create a channel
        const channel = await amqplibConnection.createChannel()
        // return the channel
        return channel
    } catch (error) {
        console.log("🚀  file: rabbitmq.js  line 111  getChannel  error", error)
        throw new APIError()
    }
}

const functionResponse = async (requestedData) => {
    console.log("inside response function")
    console.log("requested data", requestedData);
    const { event, data } = requestedData
    switch (event) {
       
    }
}
// here write the logic
const observerConsumeCallback = async (msg, channel) => {
    // console.log("🚀  file: rabbitmq.js  line 128  channel.consume  msg received from other service", msg)
    // if we have content in msg object
    if (msg.content) {

        // receiving data from other service
        // data is in string formate, so convert it into javascript object
        const convertedData = JSON.parse(msg.content)
        console.log("data from other service ", convertedData);
        // convertedData object contains {event,payload}
        const { event, payload } = convertedData
        // write response function
        const responseData = await functionResponse(convertedData)
        console.log("response to be sent back to requested service", responseData)
        let data = null
        // response payload
        // convert the payload to string
        const responsePayload = JSON.stringify({ payload: responseData })
        // send response to same client/queue who request.
        channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(responsePayload),
            {
                correlationId: msg.properties.correlationId
            }
        )
        // acknowledge
        channel.ack(msg)
    }
}

// observe
// other service will send request
const RPCObserver = async (RPC_QUEUE_NAME) => {
    try {
        console.log("RPC_QUEUE_NAME", RPC_QUEUE_NAME)
        // get channel
        const channel = await getChannel();
        // assertQueue is an declaration of queue
        channel.assertQueue(RPC_QUEUE_NAME, { durable: false })
        // prefetch value is used to specify how many messages are being sent at the same time.
        // Messages in RabbitMQ are pushed from the broker to the consumers. 
        channel.prefetch(1)
        // consume
        channel.consume(
            RPC_QUEUE_NAME,
            (msg) => { observerConsumeCallback(msg, channel) },
            { noAck: false }
        )
    } catch (error) {
        console.log("🚀  file: rabbitmq.js  line 156  RPCObserver  error", error)
        throw error
    }
}

// request
// send data to other services
const RPCRequest = async (RPC_QUEUE_NAME, payload) => {
    console.log("RPC_QUEUE_NAME, payload", RPC_QUEUE_NAME, payload)
    try {
        // generate a random uniqueID
        const uuid = uuid4()
        // get channel
        const channel = await getChannel()
        console.log("---------------->")
        // assert queue
        const q = await channel.assertQueue("", { exclusive: true })
        // convert payload to string
        const convertedPayload = JSON.stringify(payload)
        // send data to other service
        channel.sendToQueue(
            RPC_QUEUE_NAME,
            Buffer.from(convertedPayload),
            {
                replyTo: q.queue,
                correlationId: uuid
            }
        )
        // get the reponse
        return new Promise((reslove, reject) => {
            // consume
            channel.consume(
                q.queue,
                (msg) => {
                    if (msg.properties.correlationId == uuid) {
                        const responseData = JSON.parse(msg.content.toString())
                        console.log("customr responseData", responseData)

                        reslove(responseData.payload)
                    } else {
                        reject("data not found")
                    }
                },
                {
                    noAck: true
                }
            )
        })
    } catch (error) {
        console.log("🚀  file: rabbitmq.js  line 202  RPCRequest  error", error)
        throw new APIError()
    }
}

module.exports = {
    RPCObserver,
    RPCRequest
}










