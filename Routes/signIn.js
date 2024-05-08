import signin from "../controller/signIn.js";
import express from 'express'
const signInRouter=express.Router()
signInRouter.post('/sign_in',signin)

export default signInRouter;