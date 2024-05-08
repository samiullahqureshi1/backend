import dotenv from 'dotenv'
import express from 'express';
import authRouter from './Routes/router.js'
import { dbConnection } from './db_connection.js';
const app=express()
dotenv.config();
dbConnection();

    app.use(express.json());
    app.use('/users',authRouter.SignUp)
    app.use('/SignIn',authRouter.signin)
app.listen(5000,()=>{
    console.log('server properly connected')
})
