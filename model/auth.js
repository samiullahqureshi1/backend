import mongoose from 'mongoose'
const authSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},
{
    timestamps:true
})

export const authModel=mongoose.model('users',authSchema)