import { toppingModel } from "../model/topping.js";

const createTopping=(req,res)=>{
    const {name,price}=req.body
    const data=new toppingModel({
        name,
        price
    })

    data.save().then(result=>{
        if(result){
            res.status(201).send(result)
        }
    })
}

export default {
    createTopping,
}