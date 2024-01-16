require("dotenv").config();
module.exports = {
  CONSTANTS: {
    FORGET_EMAIL_SUBJECT: 'Password Reset Link',
    FORGET_EMAIL_BODY: `To reset your password, please click on the link: ${process.env.REACT_APP_BASEURL}reset-password?token=`
  },
};
