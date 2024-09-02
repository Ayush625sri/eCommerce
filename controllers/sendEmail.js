
import nodemailer from 'nodemailer'
import { config } from "dotenv";
config()

import smtpTransport from "nodemailer-smtp-transport";

export const transporter = nodemailer.createTransport(smtpTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
	service: 'gmail',
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD
    },
}))

		
export const sendEmail = async()=>{
    try {
        const mailOptions = {
            from: {
                name: "Vault24",
                address: process.env.SMTP_MAIL,
            },
            to: email,
            subject:"Vault24",
            html:"<div> Thankyou For registering on <strong>Vault24</strong></div>",
        }
        
        console.log(mailOptions)
        console.log("Sending Email...")
        
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err){
                console.log("Sent Email failed")
                console.log(err.message)
            }
            else{
                console.log('Email Sent Successfully')
            }
        })
        
    } catch (error) {;
        console.log("Error in sendEmail")
        console.log(error)
        
    }
}
