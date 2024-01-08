require("dotenv").config();
module.exports = {
  CONSTANTS: {
    FORGET_EMAIL_SUBJECT: 'Password Reset Link',
    FORGET_EMAIL_BODY: `PLEASE use this link to reset your account password. ${process.env.REACT_APP_BASEURL}reset-password?token=`
  },
};
