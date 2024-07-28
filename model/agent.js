import mongoose from 'mongoose'
const agentSchema=new mongoose.Schema({
    name: String,
    location: String,
    speciality: String,
    availability: Boolean,
    contactInfo: {
      phone: Number,
      email: String,
    },
    propertiesUpto:{
      type:Number
    },
    propertyId:[{
      type:mongoose.Schema.Types.ObjectId
    }]
})

export const agentModel=mongoose.model('agents',agentSchema)