const { createMailTransporter } = require("../createMailTransporter");

const governmentDocumentVerificationStatus = async (user, message) => {
  const transporter = createMailTransporter();

  const mailOptions = {
    from: '"ApnaPG" pravin.mhaske@apnapg.com ',
    to: user.emailId,
    subject: "ApnaPG government document verification status",
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

        <p>Your ${user.governmentDocumentVerification.documentType} send for the verification is ${message}</p>

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
      console.log(
        "Verify government document status Mail send successfully" +
          info.response
      );
    }
  });
};

module.exports = { governmentDocumentVerificationStatus };
