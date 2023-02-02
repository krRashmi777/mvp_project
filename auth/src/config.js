const dotenv = require('dotenv')
const path = require('path');
const envCmdrcPath = path.join(__dirname, "..", ".env-cmdrc")
console.log("env-cmdrc file path ==> ", envCmdrcPath);

dotenv.config({ path: envCmdrcPath })

// const MONGODB_URI = `mongodb://username:password@44.203.27.87:27017/database_name?authMechanism=SCRAM-SHA-1&authSource=admin&readPreference=primary&directConnection=true&ssl=false`.replace("username", USERNAME).replace("password", PASSWORD).replace("database_name", DATABASE_NAME)
// const MONGODB_URI = `mongodb://localhost:27017`
const CONSTANT_STRINGS = {
    PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    HOST: process.env.HOST,
    DB_USERNAME: process.env.USERNAME,
    DB_PASSWORD: process.env.PASSWORD,
    DB_NAME: process.env.DATABASE_NAME,
    MAIL_QUEUE: process.env.MAIL_QUEUE,
    BASEURL:process.env.BASEURL
}

const MAIL_STRINGS = {
    CLIENT_REGISTRATION: {
        MAIL_SUBJECT: "Your cosmonent Registration subject",
        MAIL_BODY: "client cosmonent Registration body"
    },
    CREATOR_REGISTRATION: {
        MAIL_SUBJECT: "creator Your cosmonent Registration subject",
        MAIL_BODY: "creator cosmonent Registration body"
    }
}

module.exports = { CONSTANT_STRINGS, MAIL_STRINGS }