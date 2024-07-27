import { propertyModel } from "../model/property.js";

const addProperty=(req,res)=>{
    const {title,price,description,location,type,userId}=req.body;
    const data=new propertyModel({
        title,
        price,
        description,
        location,
        type,
        userId,
    })
    data.save().then(result=>{
        if(result){
            res.status(201).send(result)
        }
    })
}

const getProperty=async(req,res)=>{
    const { type } = req.query; // Use req.query for query parameters or req.params for route parameters

    if (!['rent', 'sell', 'buy'].includes(type)) {
      return res.status(400).json({ error: 'Invalid type parameter' });
    }
  
    try {
      const properties = await propertyModel.find({ type });
  
      if (properties.length > 0) {
        res.status(200).json(properties);
      } else {
        res.status(404).json({ message: 'No properties found for the specified type' });
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

const updateProperty=(req,res)=>{
    const {id}=req.params
    propertyModel.findByIdAndUpdate(id).then(result=>{
        if(result){
            res.status(201).send('properly updated')
        }
    })
}

const deleteProperty=(req,res)=>{
    propertyModel.deleteMany().then(result=>{
        if(result){
            res.status(201).send('properly deleted')
        }
    })
}

export default {
    addProperty,
    deleteProperty,
    getProperty,
    updateProperty,
}