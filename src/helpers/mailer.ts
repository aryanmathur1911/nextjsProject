import userModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {

    //Creating a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await userModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }else if (emailType === "RESET"){
        userModel.findByIdAndUpdate(userId,
            {
                forgotPasswordToken : hashedToken,
                forgotPasswordTokenExpiry : Date.now() + 3600000
            }
        );
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "08c9fc13a06e17",
        pass: "41a1b4a6b4f25b"
        //TODO: add these credentials to .env file
        }
    });

    //details about senders and destinations

    const mailOptions = {
        from : "aryan@email.com",
        to : email,
        subject : emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html : `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
        or copy paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
        
      }

    const mailResponse = await transport.sendMail(mailOptions);
    return mailOptions;

  } catch (error: any) {
    throw new error(error.message);
  }
};
