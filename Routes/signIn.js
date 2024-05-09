import signin from "../controller/signIn.js";
import express from 'express'
const signInRouter=express.Router()
signInRouter.post('/signIn',signin)

export default signInRouter;