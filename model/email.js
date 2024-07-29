import mongoose from 'mongoose';
const emailSchema=new mongoose.Schema({
    to:{
        type:String
    },
    subject:{
        type:String
    },
    text:{
        type:String
    },
    html:{
        type:String
    }
})

export const emailModel=mongoose.model('email',emailSchema)