import mongoose from 'mongoose'
const studentSchema=new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    subjects:{
        math: { type: Number, required: true },
        physics: { type: Number, required: true },
        chemistry: { type: Number, required: true },
        biology: { type: Number, required: true },
        english: { type: Number, required: true }
    },
    total:{
        type:Number
    }
})

export const studentModel=mongoose.model('student',studentSchema)