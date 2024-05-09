import SignUp from '../controller/userSignUp.js'
import express from 'express'
const authRouter=express.Router()

authRouter.post('/signUp',SignUp)
export default authRouter;