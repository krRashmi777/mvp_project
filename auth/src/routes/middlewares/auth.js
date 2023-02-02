const jwt = require("jsonwebtoken")
const {CONSTANT_STRINGS} = require('../../config')

module.exports = (req, res, next) => {
    console.log('authenticating..')
    // var isExpiredToken = false;
    let dateNow = new Date();

    if (req.headers.authorization == undefined) {
        return res.send({ "status": 403, "message": "Invalid Token" });
    }
    const token =
        req.headers.authorization.split(' ')[1] || req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
        return res.json({ "status": 403, "message": "A token is required for authentication" })
    }
    try {
        const decoded = jwt.verify(token, CONSTANT_STRINGS.JWT_SECRET_KEY) //config.JWT_SECRET_KEY 
        console.log("decoded.exp", decoded.exp)
        console.log("dateNow.getTime() / 1000", dateNow.getTime() / 1000)

        req.user = decoded;
    } catch (err) {
        console.log("inside catch")
        switch (err.message) {
            case "invalid signature":
                res.json({ "status": 403, "message": "Invalid Token" })
                break;
            case "jwt expired":
                res.json({ "status": 403, "message": "Token expired!" })
                break;
            default:
                res.json({ "status": 403, "message": "Invalid Token" })
        }
    }
    return next()
}