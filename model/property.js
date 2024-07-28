import mongoose from 'mongoose'
const propertySchema=new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    city:{type:String},
    district:{type:String},
    type: { type: String, enum: ['rent', 'buy', 'sell'], required: true },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    bed:{
        type:Number
    },
    bath:{
        type:Number
    },
    luxuryAmenities:{
        gym:{type:Boolean},
        gamingRoom:{type:Boolean},
        library:{type:Boolean}
    },
    rating:{
        type:String,
        enum:['high','low']
    }
})

export const propertyModel=mongoose.model('properties',propertySchema)