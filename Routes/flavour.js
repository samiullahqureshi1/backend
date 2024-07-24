import flavour from "../controller/flavour.js";
import express from 'express'
const flavourRouter=express.Router()

flavourRouter.post('/',flavour.addFlavour)

export default flavourRouter;