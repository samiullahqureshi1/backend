import signIn from "../controller/logIn.js";
import express from 'express'
import user from "../validations/user.js";
import adminSignin from "../controller/adminSignIn.js";

const signInRouter=express.Router();
signInRouter.post('/',user.userSignin,signIn)
signInRouter.post('/admin',adminSignin)

export default signInRouter;