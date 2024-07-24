import adminOnly from "../controller/adminOnly.js";
import express from 'express'
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorizeAdmin.js";
const adminRouter=express.Router()
adminRouter.post('/inventory',authenticate,authorize,adminOnly.addInventory)
adminRouter.get('/inventory',authenticate,authorize,adminOnly.getInventory)
adminRouter.get('/order',authenticate,authorize,adminOnly.getAllOrders)
adminRouter.put('/inventory/:id',authenticate,authorize,adminOnly.updateInventory)
adminRouter.delete('/inventory/:id',authenticate,authorize,adminOnly.deleteInventory)

export default adminRouter;