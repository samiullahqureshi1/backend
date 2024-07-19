import { authModel } from "../model/auth.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const createToken=(user,res)=>{
    const {firstName,lastName,email,id}=user;
    const payLoad={
        id:id,
        firstName,lastName,email
    }
    console.log(payLoad)
    jwt.sign({payLoad},process.env.SECRET_KEY,{expiresIn:"1h"},(err,token)=>{
        if(err){
            res.status(404).send('unable to generate')
        }else{
            res.status(201).json({
                token
            })
        }
    })
}

const signIn=(req,res)=>{
    const {email,password}=req.body
    authModel.findOne({email}).then((user)=>{
        if(user){
            bcrypt.compare(password,user.password).then(result=>{
                if(result){
                    createToken(user,res)
                }else{
                    res.status(404).send('invalid password')
                }
            })
        }else{
            res.send('no user exist')
        }
    })
}

export default signIn;