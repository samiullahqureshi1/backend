import mongoose from 'mongoose'
const taskSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      dueDate: {
        type: Date,
      },
      priority: {
        type: String,
        
      },
      completed: {
        type: Boolean,
        default: false,
      },
      lastAccessed:{
        type:Date
      },
      timesAccessed:{
        type:Number,
        default:0
      },
      completionTime:
       { type: Number },
      frequency:
       { type: Number, default: 0}, 
      tags:{
        type:String
      }
    },{
        timestamps:true
    });

    export const taskModel=mongoose.model('Task',taskSchema)