var nodemailer = require('nodemailer');
const adminEmailId = process.env.gmailMail

function sendForgotPasswordLink(user, data) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.gmailMail, // generated ethereal user
            pass: process.env.gmailPass // generated ethereal password
        }
    })

    let mailOptions = {
        from: `<${adminEmailId}>`, // sender address
        // to: user.user_email, // list of receivers
        to: 'rizwanshaikh8085@gmail.com', // list of receivers
        subject: `${process.env.appName} - Forgot Password Recovery`, // Subject line
        html: `<html>\
                <img src="http://cdn2.iconfinder.com/data/icons/math-numbers-1/24/squared-512.png" height="50" width="50" style="margin-left: 27%;"/><br><br>
                Hello  ${user.user_firstName},<br>
                <br/>\
                Please apply this code to reset your password:<strong> ${data}</strong>
                <br/>
                Thank you,\
                <br/>${process.env.appName} Team.\
              </html>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        } else {
            console.log("Email Send");
            return json({
                message: "send mail"
            })
        }
    });
}

module.exports = {
    sendForgotPasswordLink,
    /**for forgot password reset link send to emailId */
}