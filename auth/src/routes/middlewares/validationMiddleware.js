// const createError = require('http-errors')
// validate the user request body

const validation = (schema) => async (req, res, next) => {
    const userData = req.body
    console.log("=========>", req.body.name)
    try {
        await schema.validate(userData);
        next()
        // return next();
    } catch (err) {
        console.log("inside catch", err.message)
        return res.status(500).json({ status_code: 500, type: err.name, message: err.message });
        // next(createError.NotFound("not able to find user"))
    }
};

module.exports = { validation }
