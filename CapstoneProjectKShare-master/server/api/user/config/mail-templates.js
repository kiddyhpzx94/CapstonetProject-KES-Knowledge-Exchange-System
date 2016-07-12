/**
 * Created by GiangDH on 6/7/16.
 */
var mailOptions = function(receiver, username, token)
{
  mailOptions.resetPass = {
    from: "Kshare <ayeyemm@gmail.com>", // sender address
    to:   receiver, // list of receivers
    subject: 'Kshare - Reset Your Password', // Subject line
    html: `
                <h3>E ` +username+ `</h3>
                <a href="https://localhost:3333/api/knowledges">click here</a>
                <p>Test mail phat</p>
              ` // html body
  }
  return mailOptions;
};

module.exports = mailOptions;
