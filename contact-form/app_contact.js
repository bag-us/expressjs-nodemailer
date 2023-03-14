const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const nodemailer = require('nodemailer');
require('dotenv').config();

http.createServer((req, res) => {

    if(req.url === "/") {
        // redirect ke halaman contact form
        res.writeHead(302, {
            'Location': '/contact/'
          });
        res.end();
    }

    // load the contact form
    if(req.url === "/contact/" && req.method === "GET"){
        fs.readFile("./contact-form/contact_form.html", (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }

    // send the email
    if(req.url === "/contact/" && req.method === "POST"){

        var requestBody = '';
        req.on('data', function(data) {
            // tangkap data dari form
            requestBody += data;

            // kirim balasan jika datanya terlalu besar
            if(requestBody.length > 1e7) {
              res.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
              res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
            }
        });

        req.on('end', function() {
            let formData = qs.parse(requestBody);

            // send the email
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
                subject: formData.subject,
                text: `Email from: ${formData.email}\n\nMessage: ${formData.message}`
            };
            
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) throw err;
                console.log('Email sent: ' + info.response);
                res.end("Thank you!");
            }); 
        });
               
    }

}).listen(8000);

console.log('server listening on http://localhost:8000/');