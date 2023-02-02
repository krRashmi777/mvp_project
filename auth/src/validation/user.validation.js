
const mysql = require('mysql')
const con = require('../database/connection')
const createError = require('http-errors')

const { queryExecute } = require('../sqlquery/sqlquery.executor')
const { ValidatePassword } = require('../utils')

const signupValidation = async (req, res, next) => {
    const { fullName, email, phoneNumber, password } = req.body
    try {
        const sqlPhoneSearch = `SELECT * FROM client_info WHERE phoneNumber = ?`
        const sqlEmailSearch = `SELECT * FROM client_info WHERE email = ?`

        const searchPhone_query = mysql.format(sqlPhoneSearch, phoneNumber)
        const searchEmail_query = mysql.format(sqlEmailSearch, email)
        const emailQueryResult = await queryExecute(searchEmail_query)
        console.log("===============🚀 ~ file: user.validation.js:17 ~ signupValidation ~ emailQueryResult", emailQueryResult)
        if (emailQueryResult.length != 0) {
            return next(createError.Conflict('Email already exist'))
        }
        // return emailQueryResult
        const phoneQueryResult = await queryExecute(searchPhone_query)
        console.log("🚀 ~ file: user.validation.js:20 ~ signupValidation ~ phoneQueryResult", phoneQueryResult)
        if (phoneQueryResult != 0) {
            return next(createError.Conflict('Phone number already exist'))
        }
        next()


    } catch (error) {
        console.log("======error", error)
    }
}

const loginValidation = async (req, res, next) => {
    const { email, password } = req.body
    try {

        // const sqlClientSearch = `SELECT * FROM client_info WHERE email= ?`
        // query to find the email
        const sqlEmailSearch = `SELECT * FROM client_info WHERE email= ?`
        
        // assigning the email value from req body to the sql query
        console.log("🚀 ~ file: user.validation.js:41 ~ loginValidation ~ sqlEmailSearch", sqlEmailSearch)
        const searchEmail_query = mysql.format(sqlEmailSearch, email)
        console.log("🚀 ~ file: user.validation.js:42 ~ loginValidation ~ searchEmail_query", searchEmail_query)

        const queryResult = await queryExecute(searchEmail_query)
        console.log("🚀 ~ file: user.validation.js:48 ~ loginValidation ~ queryResult", queryResult.length)
        if (queryResult.length <= 0) {
            console.log("============");
            return next(createError.NotFound('Email not found'))
        }
        next()
    } catch (error) {

    }
}


module.exports = { signupValidation, loginValidation }