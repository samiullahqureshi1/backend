import { flavourModel } from "../model/flavour.js";


const addFlavour=async(req,res)=>{
   const {name,price}=req.body
   const data = new flavourModel({
    name,price
   })
   data.save().then(result=>{
    if(result){
        res.status(201).send(result)
    }else{
        res.status(404).send('falvour not created')
    }
   })
}


export default {
    addFlavour,
}