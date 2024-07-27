import property from "../controller/property.js";
import express from 'express'
const propertyRouter=express.Router()
propertyRouter.post('/',property.addProperty)
propertyRouter.get('/type',property.getProperty)
propertyRouter.put('/:id',property.updateProperty)
propertyRouter.delete('/',property.deleteProperty)

export default propertyRouter;