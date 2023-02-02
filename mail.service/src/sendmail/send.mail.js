// user: "rashmi.kr@dollarbirdinc.com",
//     pass: "weiivxxksgkurfky"
const { CONSTANT_STRINGS, MAIL_STRINGS } = require('../config')
const nodemailer = require('nodemailer')

const sendMail = async (mailID, subject, body) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: CONSTANT_STRINGS.MAIL_SENDER_EMAIL,
            pass: CONSTANT_STRINGS.MAIL_SENDER_PASSWORD
        }
    });

    var mailOptions = {
        from: CONSTANT_STRINGS.MAIL_SENDER_EMAIL,
        to: `${mailID}`,
        subject: `${subject}`,
        html: `${body}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            
        }
    });
}


module.exports = { sendMail }

