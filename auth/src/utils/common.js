
// module.exports.MAIN_ROUTES_PATH = {
//     AUTH: '/auth',
//     ACCESSTOKEN: '/accessToken'
// }

const ROUTES_PATH = {
    REGISTRATION: {
        VERIFY_USER: '/verify_user'
    },
    USER: {
        ROOT: "/auth",
        SIGNUP: '/signup',
        LOGIN: '/login',
        UPDATE: '/updateUser/:id',
        DELETE: '/deleteUser/:id',
        LOGOUT: '/logout',
        REFRESHTOKEN: '/refreshToken'
    }
}

module.exports = { ROUTES_PATH }