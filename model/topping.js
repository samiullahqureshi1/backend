import mongoose from "mongoose";
const toppingSchema=new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    }
})

export const toppingModel=mongoose.model('toppings',toppingSchema)