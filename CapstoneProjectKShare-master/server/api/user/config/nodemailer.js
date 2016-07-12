/**
 * Created by GiangDH on 6/7/16.
 */
var nodemailer= require('nodemailer');

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  ssl: true,// use SSL
  auth: {
    user: 'ayeyemm@gmail.com',
    pass: 'anhyeuem31'
  }
};
// verify connection configuration
var transporter = nodemailer.createTransport(smtpConfig);
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});


module.exports = transporter;
