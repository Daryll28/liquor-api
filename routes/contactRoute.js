const express = require('express');
const app = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config ();


app.post('/',(req,res) =>{ 
    const{firstName,lastName, email,message} =req.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
    port: 465,
    secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
      });
      
      let mailOptions = {
        from: email,
        to: 'daryllgrainger28@gmail.com',
        subject: 'From Liquor Store',
        text: `
        firstName: ${firstName}
        lastName: ${lastName}
        Email:${email}
        Message: ${message}
        
        `,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(400).send({msg:"error"+error})
        } else {
          console.log('Email sent: ' + info.response);
          res.send({msg:"Message Sent "})
        }
      });
    
    
});


module.exports = app;