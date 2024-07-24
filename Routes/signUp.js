import signUp from "../controller/signUp.js";
import express from 'express'
import user from "../validations/user.js";
const signUpRouter=express.Router();
signUpRouter.post('/',user.userSignup,signUp)

export default signUpRouter;