const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_TRANSPORTER,
        pass: process.env.PASS_APPLICATION
    }
});

let mailOptions = {
    from: process.env.EMAIL_TRANSPORTER,
    to: process.env.EMAIL_COMPANY,
    subject: 'Sending Email using Nodejs',
    // text: 'That was easy!',
    html: '<h1>Welcome</h1><p>That was easy!</p>',
    attachments: [
        {
            path: '/home/bgs/Documents/Node \JS/Framewok/Express \JS/2 \Middleware.txt'
        }
    ]
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});