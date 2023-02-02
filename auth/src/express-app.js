const express = require('express')
const cors = require('cors')

// const API_ROUTES = require('../src/utils/common')
//routes 
const authRoutes = require('../src/routes/auth-routes')
const { ROUTES_PATH } = require('./utils/common')
module.exports = async (app) => {
    // middlewares

    // It parses incoming requests with JSON payloads
    app.use(express.json())
    //this method is to parse the incoming request with urlencoded payloads
    app.use(express.urlencoded({ extended: true }))
    //Cross-origin resource sharing (CORS) is a browser mechanism which enables controlled access to resources located outside of a given domain
    app.use(cors())
    // routes middleware 
    // app.use(ROUTES_PATH.USER.ROOT, testRoutes) // or app.use(testRoutes) 
    app.use(authRoutes)
    // error handler
    app.use((error, req, res, next) => {
        let status = error.status || 500
        let message = error.message || "internal server error"
        console.log("🚀 ~ file: express-app.js:22 ~ app.use ~ error", status, message)
        // res.status(status).send(message)
        res.send({
            status: status,
            message: message
        })
    })
    console.log("inside express app")
}