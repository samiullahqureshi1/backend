const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const loginSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
})

loginSchema.pre('save',async function(next){
    try {
        const salt=await bcrypt.genSalt(8)
        const hashedPassword=await bcrypt.hash(this.password,salt)
        this.password=hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})




module.exports=mongoose.model('login',loginSchema)