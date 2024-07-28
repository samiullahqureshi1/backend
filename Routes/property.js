import property from "../controller/property.js";
import express from 'express'
import authenticate from '../middleware/authenticate.js'
const propertyRouter=express.Router()
propertyRouter.post('/',property.addProperty)
propertyRouter.get('/type',property.getProperty)
propertyRouter.put('/:id',property.updateProperty)
propertyRouter.get('/luxury',property.getLuxury)
propertyRouter.get('/filter',property.filtration)
propertyRouter.delete('/',property.deleteProperty)
propertyRouter.get('/hightolow',property.getprice)
propertyRouter.get('/lowtohigh',property.getPropertiesSortedByPrice)
propertyRouter.get('/rating',property.getRating)
propertyRouter.get('/newest',property.getNewest)
propertyRouter.get('/getcity',property.getCity)

export default propertyRouter;