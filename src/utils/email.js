const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  static async sendEmail(params) {
    try {
      const transportConfig = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // use SSL
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      
      };
      let transporter = nodemailer.createTransport(transportConfig);

      let mailOptions = {};
      if (params.html) {
        mailOptions = {
          to: params.email,
          subject: params.subject,
          html: params.body,
        };
      } else {
        mailOptions = {
          from: process.env.SMTP_FROM_ADDRESS,
          to: params.email,
          subject: params.subject,
          text: params.body,
        };
      }
      await transporter.sendMail(mailOptions);
      console.log("returning ok")
      return 'ok';
    } catch (error) {
      console.log("returning error")
      console.log(error)

      return error;
    }
  }
}
module.exports = { EmailService };
