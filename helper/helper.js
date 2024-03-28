import nodemailer from 'nodemailer';
import User from '../models/UserModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




export const sendEmail = async({email, emailType, userId}) => {
    try {
        // const hashedToken = await bcrypt.hash(userId.toString(), 10)
        const hashedToken = jwt.sign({ id: userId }, process.env.JWT_SECRET);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILERUSER,
              pass: process.env.MAILERPASS
              //TODO: add these credentials to .env file
            }
          });


        const mailOptions = {
            from: 'dev.aayushpandey@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}