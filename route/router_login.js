const login=require('../model/login.js')
const express=require('express')
const jwt=require('jsonwebtoken')
const secretkey='secretkey'
const router=express.Router()
router.post('/',async(req,res)=>{

    let data=new login({
        email:req.body.email,
        password:req.body.password
    })
    await data.save()
   
   jwt.sign({data},secretkey,{expiresIn:'300s'},(err,token)=>{
    res.json({
        token
    })
   })

})





module.exports=router;