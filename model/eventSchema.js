import mongoose from "mongoose";
const eventSchema=new mongoose.Schema(
    {
        name:String,
        time:Number,
    },
    {
        timestamps:true,
    },
);

export const eventModel=mongoose.model('event',eventSchema)