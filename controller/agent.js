import { agentModel } from "../model/agent.js";
const addAgent =(req,res)=>{
    const {name,location,speciality,availability,contactInfo,propertiesUpto,propertyId}=req.body
    const data=new agentModel({
        name,
        location,
        speciality,
        availability,
        contactInfo,
        propertiesUpto,
        propertyId,
    })
    data.save().then(result=>{
        if(result){
            res.status(201).send(result)
        }
    })
}

const findAgent=async(req,res)=>{
        try {
          const { location, speciality, availability } = req.query;
      
          // Build the query object
          let query = {};
      
          if (location) {
            query.location = location;
          }
      
          if (speciality) {
            query.speciality = speciality;
          }
      
          if (availability !== undefined) {
            query.availability = availability === 'true'; // Convert string to boolean
          }
      
          const agents = await agentModel.aggregate([
          {$match:query},
            {
              $lookup:{
                from:'properties',
                localField:'propertyId',
                foreignField:'_id',
                as:'property'
              }
            }, { $unwind: { path: '$properties', preserveNullAndEmptyArrays: true } }
          ])
      
          res.status(200).json(agents);
        } catch (error) {
          console.error('Error fetching agents:', error);
          res.status(500).json({ error: 'Failed to fetch agents' });
        }
};

const deleteAgent =(req,res)=>{
    agentModel.deleteMany().then(result=>{
        if(result){
            res.status(201).send('properly deleted')
        }
    })
}

export default {
    addAgent,
    findAgent,
    deleteAgent
}