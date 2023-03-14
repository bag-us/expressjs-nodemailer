const express = require('express')
const fs = require('fs')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    fs.readFile("./contact-form/contact_form.html", (err, data) => {
        if (err) throw err;
        res.end(data);
    });
})

app.post('/',(req, res, next) => {
    const formData = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_TRANSPORTER,
          pass: process.env.PASS_APPLICATION
        }
      });
    
      const mailOptions = {
        from: process.env.EMAIL_TRANSPORTER,
        to: process.env.EMAIL_COMPANY,
        subject: formData.subject,
        text: `Email from: ${formData.email}\n\nMessage: ${formData.message}`
      };
    
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
        res.send('<script>alert("Email has been sent!"); window.location = "/";</script>');
      });
})

app.listen(7000, () => {
    console.log('Example app listening on port 7000!')
  })