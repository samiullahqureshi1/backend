const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const loginSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
})





module.exports=mongoose.model('login',loginSchema)