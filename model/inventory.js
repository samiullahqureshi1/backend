import mongoose from 'mongoose'
const inventorySchema=new mongoose.Schema({
    ingrediant:{
        type:String
    },
    quantity:{
        type:Number
    }
})

export const inventoryModel=mongoose.model('inventory',inventorySchema)