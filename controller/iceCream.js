import { flavourModel } from "../model/flavour.js";
import { toppingModel } from "../model/topping.js";

const calculatePrice=async(req,res)=>{
    const { flavours, toppings } = req.body;

    try {
      let totalPrice = 0;
  
      for (const flavourId of flavours) {
        const flavour = await flavourModel.findById(flavourId);
        if (flavour) totalPrice += flavour.price;
      }
  
      for (const toppingId of toppings) {
        const topping = await toppingModel.findById(toppingId);
        if (topping) totalPrice += topping.price;
      }
  
      res.json({ totalPrice });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}


export default {
    calculatePrice,
}