import {PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,} from "./emailTemplates.js";
import dotenv from "dotenv";
import  nodemailer  from "nodemailer";
dotenv.config();
// nodemailer
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
  },
});

const sendVerificationEmail = async(email, verificationToken) => {
	try {        
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        };        
        await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error(`Error sending verification`, error.message);
		throw new Error(`Error sending verification email: ${error}`);
	}
};


const sendPasswordResetEmail = async (email, resetURL) => {

	try {
		
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        };
        await transporter.sendMail(mailOptions);

	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

const sendResetSuccessEmail = async (email) => {

	try {
		
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        };
        await transporter.sendMail(mailOptions);


		console.log("Password reset email sent successfully", mailOptions);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};

export  {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail
  };
  