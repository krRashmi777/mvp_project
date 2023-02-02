const dotenv = require('dotenv')
const path = require('path')

const envCmdrcPath = path.join(__dirname, "..", ".env-cmdrc")
dotenv.config({ path: envCmdrcPath })


const CONSTANT_STRINGS = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DB_NAME: process.env.DATABASE_NAME,
    DB_USERNAME: process.env.USERNAME,
    DB_PASSWORD: process.env.PASSWORD,
    MAIL_SENDER_EMAIL: process.env.MAIL_SENDER_EMAIL,
    MAIL_SENDER_PASSWORD: process.env.MAIL_SENDER_PASSWORD,
    MAIL_QUEUE: process.env.MAIL_QUEUE
}




module.exports = { CONSTANT_STRINGS }