// Bcrypt is a popular and trusted method for salt and hashing passwords
const bcrypt = require('bcrypt')
const { CONSTANT_STRINGS } = require('../config')
const jwt = require('jsonwebtoken')

console.log("process.env.JWT_SECRET_KEY", CONSTANT_STRINGS.JWT_SECRET_KEY)

// A salt is a random string that makes the hash unpredictable
const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}
// hashed password and saving in database
const GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt)
}

// validate the password stored in the database with user entered
// module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
//     return await this.GeneratePassword(enteredPassword, salt) === savedPassword
// }

const ValidatePassword = async (enteredPassword, savedPassword, salt) => {
    console.log("enteredPassword, savedPassword, salt", enteredPassword, savedPassword, salt);
    console.log("========", GeneratePassword(enteredPassword, salt) === savedPassword)
    return await GeneratePassword(enteredPassword, salt) === savedPassword
}


// generate token(JWT)
// module.exports.GenerateSignature = (payload) => {
//     console.log("Inside the generate signature", payload)
//     try {
//         return new Promise((resolve, reject) => {
//             jwt.sign(
//                 payload, CONSTANT_STRINGS.JWT_SECRET_KEY, {
//                 expiresIn: "1d"
//             }, (err, token) => {
//                 if (err) {
//                     console.log("erroooooo", err)
//                     return reject(err)
//                 } else {
//                     return resolve(token)
//                 }
//             })
//         })

//     } catch (error) {
//         console.log("======>", error)
//     }
// }
const GenerateSignature = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            CONSTANT_STRINGS.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            },
            (err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token)
            }
        )
    })
}
// password string
// module.exports.CheckPassword = async (password) => {
//     console.log("====password", password)
//     // min 8 letter password, with at least a symbol, upper and lower case letters and a number
//     let regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//     console.log("regular expression",regularExpression)
//     if (!regularExpression.test(password)) {
//         console.log("inside if")
//         return false
//     }
// }


module.exports = { GenerateSalt, GeneratePassword, ValidatePassword, GenerateSignature }