const login=require('../model/login.js')
const express=require('express')
const jwt=require('jsonwebtoken')
const secretkey='secretkey';
const bcrypt=require('bcrypt')
const saltRound=10;
const router=express.Router()
router.post('/',async(req,res)=>{
    let data=new login({
        username:req.body.username,
        email:req.body.email,
       password:bcrypt.hashSync(req.body.password, saltRound)
    })
    await data.save()
       

    jwt.sign({data},secretkey,{expiresIn:'300s'},(err,token)=>{
        res.json({
            token
        })
    })
  
})





module.exports=router;