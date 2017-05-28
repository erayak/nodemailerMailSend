var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', (request, response, next) => {
  response.render('index');
});

// Send Mail
router.post('/',( request, response, next ) => {

    var service = request.body.service;
    var mail = request.body.mail;
    var password = request.body.password;
    var receiver = request.body.receiver;
    var subject = request.body.subject;
    var html = request.body.html;

    if
    ( 
        !( 
            (service === '') || (mail === '') || 
            (password === '') || (receiver === '') || 
            (subject === '') || (html === '')
        )
    )
    {

        for( var i = 0; i < receiver.split(',').length; i++ )
        {
            let transporter = nodemailer.createTransport({
                service: `${service}`,
                auth: {
                    user: `${mail}`,
                    pass: `${password}`
                }
            });

            let mailOptions = {
                from: `"${mail}" <${mail}>`, 
                to: `${receiver.split(',')[i]}`, 
                subject: `${subject}`,
                html: `${html}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                response.render('index',{ status:1 });
            });
        }
   
    }
    else
        response.redirect('/');
    
});

module.exports = router;