const { createMailTransporter } = require("./createMailTransporter");

const sendVerificationOTPEmail = async (user, verificationCode) => {
  const transporter = createMailTransporter();

  const mailOptions = {
    from: '"ApnaPG" pravin.mhaske@apnapg.com ',
    to: user.emailId,
    subject: "ApnaPG Verification Code",
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ApnaPG Account Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif;">

        <p>Hi ${user.name.firstName} ${user.name.lastName},</p>

        <p>Your otp for the ${user.emailId} is </p>
        <p style="font-size: 24px; font-weight: bold; color: #007bff;">${verificationCode}</p>

        <p>The OTP code is valid for the only 10 minutes.</p>

        <p>If you did not request this code, it is possible that someone else is trying to access your ApnaPG account. Please do not forward or share this code with anyone.</p>

        <p>You received this message because this email address is registered with ApnaPG. If you believe this is a mistake or if you did not initiate this request, please disregard this email.</p>

        <p>Thank you for using ApnaPG.</p>

        <p>Best regards,<br>
        The ApnaPG Team</p>

        </body>
        </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification Mail send successfully" + info.response);
    }
  });
};

module.exports = { sendVerificationOTPEmail };
