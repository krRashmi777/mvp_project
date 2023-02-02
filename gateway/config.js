const dotenv = require('dotenv')
const path = require('path');
const envCmdrcPath = path.join(__dirname, "..", ".env-cmdrc")
console.log("env-cmdrc file path ==> ", envCmdrcPath);

dotenv.config({ path: envCmdrcPath })

module.exports = {
    PORT: process.env.PORT,
}