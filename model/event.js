import mongoose from 'mongoose'
const eventSchema=new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
},{
    timestamps:true
})

export const eventModel=mongoose.model('event',eventSchema)