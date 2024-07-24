import order from "../controller/order.js";
import express from 'express'
import authehticate from '../middleware/authenticate.js'
const orderRouter=express.Router()
orderRouter.post('/place',authehticate,order.placeOrder)
orderRouter.get('/history',authehticate,order.getOrderHistory)

export default orderRouter;