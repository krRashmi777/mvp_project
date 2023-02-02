const express = require('express')
const router = express.Router()

const { ROUTES_PATH } = require('../utils/common')

const userService = require('../controller/user')
const auth = require('../routes/middlewares/auth')

const { validation } = require('../routes/middlewares/validationMiddleware')
const { userSchema, loginSchema } = require('../validation/userValidation')

const { signupValidation, loginValidation } = require('../validation/user.validation')
console.log("=======>update", ROUTES_PATH.USER.UPDATE);
// refresToken 
// router.post(ROUTES_PATH.USER.REFRESHTOKEN)

router.post(ROUTES_PATH.USER.SIGNUP, validation(userSchema), signupValidation, userService.userSignup)
// once the user enters his information registration link is sent to his email id
router.get(ROUTES_PATH.REGISTRATION.VERIFY_USER + '/:token', userService.verifyUser)
router.post(ROUTES_PATH.USER.LOGIN, loginValidation, userService.userLogin)
// router.put(ROUTES_PATH.USER.UPDATE, userService.updateUser)
// router.delete(ROUTES_PATH.USER.DELETE)


module.exports = router