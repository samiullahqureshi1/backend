import iceCream from "../controller/iceCream.js";
import express from 'express'
const iceCreamRouter=express.Router()
iceCreamRouter.post('/calculatePrice',iceCream.calculatePrice)

export default iceCreamRouter;