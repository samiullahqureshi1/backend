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
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
      },
      completed: {
        type: Boolean,
        default: false,
      }
    },{
        timestamps:true
    });

    export const taskModel=mongoose.model('Task',taskSchema)