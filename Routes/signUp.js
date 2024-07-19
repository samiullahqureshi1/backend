import signUp from "../controller/signUp.js";
import express from 'express'
const signUpRouter=express.Router();
signUpRouter.post('/',signUp)

export default signUpRouter;