const express = require('express')
const { CONSTANT_STRINGS } = require('./config')
const expressApp = require('../src/express-app')
const app = express()
console.log("========>", CONSTANT_STRINGS.PORT);
// import database connection
require('./database/connection')

function startServer() {
    console.log("starting....")
    expressApp(app)
    app.listen(CONSTANT_STRINGS.PORT, () => {
        console.log("server is up and running");
    })
}
startServer();

