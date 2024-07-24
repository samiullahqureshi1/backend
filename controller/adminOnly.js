import { orderModel } from "../model/order.js";
import { inventoryModel } from "../model/inventory.js";

//get all orders(admin only)

const getAllOrders=async(req,res)=>{
    try {
        const orders = await orderModel.find().populate('items.flavorId items.toppingIds');
        res.json(orders);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const getInventory=(req,res)=>{
  inventoryModel.find().then(result=>{
    if(result){
      res.status(201).send(result)
    }
  })
}

const addInventory=(req,res)=>{
  const {ingrediant,quantity}=req.body
  const data=new inventoryModel({
    ingrediant,
    quantity,
  })
  data.save().then(result=>{
    res.status(201).send(result)
  })
}

const updateInventory=(req,res)=>{
  const {id}=req.params
  inventoryModel.findByIdAndUpdate(id).then(result=>{
    if(result){
      res.status(201).send({
        message:'properly updated',
        result
      })
    }
  })
}

const deleteInventory=(req,res)=>{
  const {id}=req.params
  const query={$set:req.body}
  inventoryModel.findByIdAndDelete(id,query).then(result=>{
    if(result){
      res.status(201).send({
        message:'properly deleted inventory',
        result,
      })
    }
  })
}

export default {
  getAllOrders,
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
}
