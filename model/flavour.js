import mongoose from 'mongoose'
const flavourSchema=new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    }
})

export const flavourModel=mongoose.model('flavours',flavourSchema)