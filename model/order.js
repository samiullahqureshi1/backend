import mongoose from 'mongoose'
const orderSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    items: [{
      flavourId: { type: mongoose.Schema.Types.ObjectId, ref: 'flavours', required: true },
      toppingIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'toppings' }],
      quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
},{
    timestamps:true
})

export const orderModel=mongoose.model('order',orderSchema)