import topping from "../controller/topping.js";
import express from 'express'
const toppingRouter=express.Router()
toppingRouter.post('/',topping.createTopping)


export default toppingRouter;