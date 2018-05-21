var nodemailer = require('nodemailer');
var config = require('./config');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.email, //  user
        pass: config.pass //  password
    }
});

// setup email data with unicode symbols
module.exports.sendEmail = function(to, message) {
    var mailOptions = {
        to: to,
        from: config.email,
        subject: 'Test Resolution Notification',
        text: message + "\n Thanks, \n The SupDesk Team"

    };
    transporter.sendMail(mailOptions, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('mail sent');
        }

    });
};