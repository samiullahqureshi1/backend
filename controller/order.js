import { orderModel } from "../model/order.js";

const placeOrder=async(req,res)=>{
    const { items, totalPrice } = req.body;
  const userId = req.user.id;

  try {
    const newOrder = new orderModel({ userId, items, totalPrice });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getOrderHistory=async(req,res)=>{
    const userId = req.user.id;

  try {
    const orders = await orderModel.find({ userId }).populate('items.flavourId items.toppingIds');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
    placeOrder,
    getOrderHistory,
}