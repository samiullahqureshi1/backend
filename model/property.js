import mongoose, { mongo } from 'mongoose'
const propertySchema=new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['rent', 'buy', 'sell'], required: true },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'}
})

export const propertyModel=mongoose.model('properties',propertySchema)