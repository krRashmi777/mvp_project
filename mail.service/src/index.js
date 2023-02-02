const express = require('express')
const { CONSTANT_STRINGS } = require('../src/config');
const { expressApp } = require('./express-app');

const app = express()

function startServer() {
    console.log("starting...");
    expressApp(app);
    app.listen(CONSTANT_STRINGS.PORT, () => {
        console.log("mail service up and running");
    })
}
startServer();