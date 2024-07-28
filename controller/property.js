import { propertyModel } from "../model/property.js";


const addProperty=(req,res)=>{
    const {title,price,description,city,district,type,userId,bed,bath,luxuryAmenities,rating}=req.body;
    const data=new propertyModel({
        title,
        price,
        description,
        type,
        userId,
        bed,
        bath,
        luxuryAmenities,
        rating,
        city,
        district,
    })
    data.save().then(result=>{
        if(result){
            res.status(201).send(result)
        }
    })
}

const getProperty = async (req, res) => {
    const { type } = req.query; // Use req.query for query parameters or req.params for route parameters
  
    // Validate the type parameter
    if (!['rent', 'sell', 'buy'].includes(type)) {
      return res.status(400).json({ error: 'Invalid type parameter' });
    }
  
    try {
      // Fetch properties based on the type and populate the user information
      
        const properties = await propertyModel.aggregate([
          { 
            $match: { 
              type: type // Match the type exactly
            } 
          },
          {
            $lookup: {
              from: 'users', // The collection name of the user data
              localField: 'userId',
              foreignField: '_id',
              as: 'user'
            }
          },
          { $unwind: '$user' }])// To deconstruct the user
  
      if (properties.length > 0) {
        res.status(200).json(properties);
      } else {
        res.status(404).json({ message: 'No properties found for the specified type' });
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const getLuxury=async(req,res)=>{
  const {gym,gamingRoom,library}=req.query
  const query = {};

  if (gym !== undefined) {
    query['luxuryAmenities.gym'] = gym === 'true'; // Convert to boolean
  }

  if (gamingRoom !== undefined) {
    query['luxuryAmenities.gamingRoom'] = gamingRoom === 'true'; // Convert to boolean
  }

  if(library!==undefined){
    query['luxuryAmenities.library'] = library === 'true';
  }

  const properties = await propertyModel.aggregate([
    { $match: query},
    {
      $lookup: {
        from: 'users', // The collection name of the user data
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' }, // To deconstruct the user array and merge the fields
  ]);
  res.json(properties);
}

const filtration=async(req,res)=>{
  const { type, minPrice, maxPrice, bed, bath} = req.query;
  let filters = {};

  if (type) filters.type = type;
  if (minPrice || maxPrice) filters.price = {};
  if (minPrice) filters.price.$gte = minPrice;
  if (maxPrice) filters.price.$lte = maxPrice;
  if (bed) filters.bed = bed;
  if (bath) filters.bath = bath;
 
  try {
    const properties = await propertyModel.find(filters).populate('userId')
    res.status(200).json(properties);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

const getPropertiesSortedByPrice = async (req,res) => {
  try {
    const properties = await propertyModel.find().sort({ price: 1 }).exec();
    res.json(properties)
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

const getprice= async (req,res) => {
  try {
    const properties = await propertyModel.find().sort({ price: -1 }).exec();
    res.json(properties)
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

const getRating=async(req,res)=>{
  const { rating } = req.query; // Use req.query for query parameters or req.params for route parameters
  
  // Validate the type parameter
  if (!['high','low'].includes(rating)) {
    return res.status(400).json({ error: 'Invalid rating parameter' });
  }

  try {
    // Fetch properties based on the type and populate the user information
   const properties=await propertyModel.aggregate([
    {
      $match:{
        rating:rating
      }
    },
    {
      $lookup:{
        from:'users',
        localField:'userId',
        foreignField:'_id',
        as:'user'
      }
    },
    {
      $unwind:'$user'
    }
   ])

    if (properties.length > 0) {
      res.status(200).json(properties);
    } else {
      res.status(404).json({ message: 'No properties found for the specified rating' });
    }
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getNewest=async(req,res)=>{
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ error: 'Title query parameter is required' });
    }

    const properties = await propertyModel.aggregate([
      { 
        $match: { 
          title: title // Exact match on title
        } 
      },
      {
        $lookup: {
          from: 'users', // The collection name of the user data
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' }])
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties by title:', error);
    res.status(500).json({ error: 'Failed to fetch properties by title' });
  }
}

const getCity=async(req,res)=>{
  const {city,district}=req.query
  const query={}
  if(city){
    query.city=city
  }
  if (district) {
    query.district = district;
  }

  const properties = await propertyModel.aggregate([
    { $match: query},
    {
      $lookup: {
        from: 'users', // The collection name of the user data
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' }, // To deconstruct the user array and merge the fields
  ]);

  res.json(properties);
}

export default {
    addProperty,
    deleteProperty,
    getProperty,
    updateProperty,
    getLuxury,
    filtration,
    getPropertiesSortedByPrice,
    getprice,
    getRating,
    getNewest,
    getCity,
}