import { userModel } from "../model/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken=(user,res)=>{
    const {email,id,name} =user;
    const payload={
        id:id,
        email,
        name,
    }
    console.log(payload)
    jwt.sign({payload},process.env.SECRET_KEY,{expiresIn:'1h'},(error,token)=>{
        if(error){
            res.status(404)
            .send('unable to generate token')
        }else{
            res.status(201)
            .json({
                token
            });
        }
    })
}


const signin=(req,res)=>{
    const {email,password}=req.body;
    userModel.findOne({email}).then((user)=>{
        if(user){
            bcrypt.compare(password,user.password).then(result=>{
                if(result){
                    createToken(user,res)
                }else {
                    res.status(400)
                    .send('Invalid Password')
                }
            })
        }else{
            res.status(404)
            .send('no user exist with this email')
        }
    })
}

export default signin;