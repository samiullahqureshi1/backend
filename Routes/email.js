import email from "../controller/email.js";
import express from 'express'
const emailRouter=express.Router()
emailRouter.post('/',email.addEmail)
export default emailRouter;