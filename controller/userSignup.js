import { userModel } from "../model/userSchema.js";
import bcrypt from 'bcrypt'


const signUp=async(req,res)=>{
   const {name,email,password}=req.body;
   const query={email}
   userModel.findOne(query).then((user)=>{
    if(user){
        if(user.email==email){
            res.status(400)
            .send('email already taken')
        }
    } else {
        bcrypt.hash(password,12).then((hashedpassword)=>{
            const User=new userModel({
                name,
                password:hashedpassword,
                email
            })
            User.save();
        })
    }
       
   })
}
export default signUp;