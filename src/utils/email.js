const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  static async sendEmail(params) {
    try {
      let transporter = nodemailer.createTransport({
        service: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      let mailOptions = {};
      if (params.html) {
        mailOptions = {
          to: params.email,
          subject: params.subject,
          html: params.body,
        };
      } else {
        mailOptions = {
          to: params.email,
          subject: params.subject,
          text: params.body,
        };
      }
      await transporter.sendMail(mailOptions);
      return 'ok';
    } catch (error) {
      return error;
    }
  }
}
module.exports = { EmailService };
