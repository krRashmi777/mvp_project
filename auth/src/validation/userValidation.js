const yup = require('yup')
// 
require('yup-phone');

const userSchema = yup.object({
    fullName: yup.string().required('fullName is required'),
    phoneNumber: yup.string().phone().required('phone is required'),
    email: yup.string().required('email is required').email('please enter valid email'),
    password: yup.string().min(8).max(10).required('password is required')
})

const loginSchema = yup.object({
    email: yup.string().required('email is required').email('please enter valid email'),
    password: yup.string().min(8).max(10).required('password is required')
})



module.exports = {
    userSchema,loginSchema
}