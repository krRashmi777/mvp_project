
// const userModel = require('../database/models/user') // unwanted import
const { GenerateSalt, GeneratePassword, ValidatePassword, CheckPassword, GenerateSignature } = require('../utils')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const con = require('../database/connection')
const { RPCRequest } = require('../utils/rpc')
const { CONSTANT_STRINGS, MAIL_STRINGS } = require('../config')
const { queryExecute } = require('../sqlquery/sqlquery.executor')
// user signup /create user data
const userSignup = async (req, res, next) => {
    try {
        const { fullName, email, phoneNumber, password } = req.body
        console.log("======>", req.body)

        const salt = await GenerateSalt()
        const encryptedPassword = await GeneratePassword(password, salt)

        const sqlInsert = `INSERT INTO client_info (fullName, email,phoneNumber,password,salt) VALUES('${fullName}', '${email}', '${phoneNumber}', '${encryptedPassword}','${salt}')`
        const insert_query = mysql.format(sqlInsert)
        // token to be sent through mail
        // create a secret
        // var clientSecret = CONSTANT_STRINGS.JWT_SECRET_KEY + password
        // console.log("clientSecret", clientSecret)
        // payload
        var clientPayload = {
            email: email
        }
        console.log("clientPayload", clientPayload)
        // token
        var clientToken = jwt.sign(clientPayload, CONSTANT_STRINGS.JWT_SECRET_KEY, { expiresIn: '15m' })
        // storing token in database
        console.log("adminToken", clientToken)

        var adminLink = CONSTANT_STRINGS.BASEURL + `/verify_user/${clientToken}`
        const MAILBODY = 'Hi,' + fullName + ' ' + MAIL_STRINGS.CLIENT_REGISTRATION.MAIL_BODY + " " + adminLink

        con.query(insert_query, async (err, result) => {
            try {
                // con.release()
                if (err) throw (err)
                console.log("--------> Created new User")
                const payload = {
                    event: "SEND_EMAIL", data: {
                        email: email,
                        subject: MAIL_STRINGS.CLIENT_REGISTRATION.MAIL_SUBJECT,
                        body: MAILBODY
                    }
                }
                const responseData = await RPCRequest(CONSTANT_STRINGS.MAIL_QUEUE, payload)
                console.log("responseData", responseData)
                console.log(result.insertId)
                // if mail sent update the token 
                if (responseData) {
                    const sqlUpdate = `UPDATE client_info SET token='${clientToken}' WHERE email='${email}'`
                    const update_query = mysql.format(sqlUpdate)
                    await queryExecute(update_query)
                    return res.send({
                        status_code: 200,
                        message: "registration mail sent your email"
                    })
                    // var clientStoreToken = await AdminModel.findOneAndUpdate({ email: email }, { token: adminToken }, { new: true })
                    // console.log("adminStoreToken", adminStoreToken)
                }

            } catch (error) {
                console.log("===>", error);
            }

        })

    } catch (error) {
        console.log("========>error from create user", error)
        throw new Error(error);
    }
}

// verify user
const verifyUser = async (req, res, next) => {
    try {
        const token = req.params.token
        var userData = jwt.verify(token, CONSTANT_STRINGS.JWT_SECRET_KEY);
        console.log("userData", userData.email) // bar
        const userEmail = userData.email
        // SELECT token from `client_info` WHERE email='rashmi.kr@dollarbirdinc.com';
        const sqlSearch = `SELECT token from client_info WHERE email='${userEmail}'`
        const search_query = mysql.format(sqlSearch)
        console.log("search query ", search_query);
        const querySearchResult = await queryExecute(sqlSearch)

        console.log("query search result", querySearchResult);
        console.log("querySearchResult[0].token != token", querySearchResult[0].token != token)
        if (querySearchResult[0].token === "") {
            return next(createError.Unauthorized('token expired'))
        }
        
        if (querySearchResult[0].token != token) {
            return next(createError.Unauthorized("Invalid token"))
        }
        const sqlUpdate = `UPDATE client_info SET token=' ',isVerified='true' WHERE email='${userEmail}'`
        const update_query = mysql.format(sqlUpdate)
        console.log("sqlUpdate", sqlUpdate)
        await queryExecute(update_query)
        return res.send({
            status_code: 200,
            message: "user verified successfully!"
        })

    } catch (error) {
        console.log("error======", error)
        switch (error.message) {
            case "jwt expired": return next(createError.Unauthorized('token expired'));
                break;
            case "jwt malformed": return next(createError.Unauthorized("Invalid token"))
                break;
            case "invalid signature": return next(createError.Unauthorized("Invalid token"))
                break;
            default: console.log("=====", error)
        }

    }
}


// login 
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        console.log("email and password", email, password)

        const token = await GenerateSignature({ email: email })
        return res.send({
            status_code: 200,
            token: token,
            message: "login successful",
        })
    } catch (error) {
        console.log("error from login=====", error)
    }
}
module.exports = { userSignup, verifyUser, userLogin }
