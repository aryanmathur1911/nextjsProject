import userModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

interface MailerOptions {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: MailerOptions) => {
  try {
    // Creating a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await userModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    } else if (emailType === "RESET") {
      await userModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "08c9fc13a06e17",
        pass: "41a1b4a6b4f25b",
      },
    });

    const mailOptions = {
      from: "aryan@email.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };

    await transport.sendMail(mailOptions);
    return mailOptions;

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred while sending email");
  }
};
