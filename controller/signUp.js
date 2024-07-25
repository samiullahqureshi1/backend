import { authModel } from "../model/auth.js";
import bcrypt from 'bcrypt'

const signUp=async(req,res)=>{
    const {name,email,password}=req.body;
    const query={email}
    authModel.findOne(query).then((user)=>{
        if(user){
            if(user.email==email){
                res.send({
                    message:'email already taken',
                    user,
                })
            }
        }else{
            bcrypt.hash(password,12).then(hashedpassword=>{
                const  User=new authModel({
                   name,
                    email,
                    password:hashedpassword
                })
                User.save();
            })
        }
    })
}

export default signUp;