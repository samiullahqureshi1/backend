import signUp from '../controller/userSignUp.js'
import SignUp from '../controller/userSignUp.js'
import express from 'express'
const authRouter=express.Router()

authRouter.post('/sign_up',SignUp)

export default authRouter;