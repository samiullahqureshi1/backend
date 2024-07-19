import signIn from "../controller/logIn.js";
import express from 'express'
const signInRouter=express.Router();
signInRouter.post('/',signIn)

export default signInRouter;