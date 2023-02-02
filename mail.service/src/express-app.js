const express = require('express')
const cors = require('cors')
const { RPCObserver } = require('./utils/rpc')
const { CONSTANT_STRINGS } = require('../src/config')

const expressApp = async (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    RPCObserver(CONSTANT_STRINGS.MAIL_QUEUE)
}
module.exports = { expressApp }