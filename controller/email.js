import { emailModel } from "../model/email.js";
import sgMail from '@sendgrid/mail'

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
        res.status(201).send('email sent successfully')
    } catch (error) {
        console.log(error.message)
    }
}


export default {
    addEmail
}