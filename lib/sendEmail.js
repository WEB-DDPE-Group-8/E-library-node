var nodemailer = require("nodemailer");

//send email
exports.sendingMail = (email, token) => {
  var email = email;
  var token = token;

  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "appdev@aastu.edu.et", // Your email id
      pass: "**Appdev#024680", // Your password
    },
  });

  var mailOptions = {
    from: "appdev@aastu.edu.et",
    to: email,
    subject: "Reset Password Link",
    html:
      "<p>You requested for reset password, kindly use this" +
      '<a href="http://localhost:5000/auth/reset_password?token=' +
      token +
      '">' +
      " link</a> to reset your password</p>",
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) console.log(1);
    else {
      console.log("herex:");
      console.log(0);
    }
  });
};
