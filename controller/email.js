import { emailModel } from "../model/email.js";
import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer';

const sendGrigKey=process.env.SENDGRID_KEY

sgMail.setApiKey(sendGrigKey)

const addEmail=(req,res)=>{
    const {to,subject,text,html}=req.body
    const message={
        to,
        from:'samiullahqureshi669@gmail.com',
        subject,
        text,
        html,
    }
    try {
        sgMail.send(message);
        const email=new emailModel({to,subject,text,html})
        email.save()
        res.status(201).send('email sent successfully')
    } catch (error) {
        console.log(error.message)
    }
}

const sendWithNodemailer = async (req, res) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: '"sanawish" <sanawish146@gmail.com>',
        subject: 'Hello World',
        text: 'Hello World',
        html: '<b>Hello World</b>',
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      res.json(info);
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  };

export default {
    addEmail,
    sendWithNodemailer,
}