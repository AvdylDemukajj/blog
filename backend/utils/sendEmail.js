const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      password: process.env.PASSWORD,
    },
  });

  const message = {
    to: emailTo,
    subject,
    html: `
    <div>
    <h3>Use this bellow code to ${content}</h3>
    <p><strong>Code: </strong>${code}</p>
    </div>
    `,
  };

  await transporter.sendMail(message);
  console.log(object);
};

module.exports = sendEmail;
