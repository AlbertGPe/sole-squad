const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'albertironhackproject@gmail.com',
    pass: process.env.MAIL_PASS
  }
});

module.exports.sendConfirmationEmail = (user) => {
  transporter
    .sendMail({
      from: 'albertironhackproject@gmail.com',
      to: user.email,
      subject: 'Confirm your account',
      html: `
        <h1>Welcome to Sole Squad!</h1>
        <p>Please click to the following link to confirm your account:</p>
        <a href="${process.env.API_URL}/users/${user.id}/confirm">Confirm</a>
      `
    })
    .then((info) => console.log(info))
    .catch((error) => console.log(error))
}
