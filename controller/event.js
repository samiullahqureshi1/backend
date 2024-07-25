import { eventModel } from "../model/event.js";
const addEvent=async(req,res)=>{
    const {title,description,category,attendees,creator}=req.body
    const data=new eventModel({
        title,
        description,
        category,
        attendees,
        creator,
    })
    await data.save().then(result=>{
        if(result){
            res.status(201).send(result)
        }
    })
}

const getEvent =(req,res)=>{
    eventModel.find().then(result=>{
        if(result){
            res.status(201).send(result)
        }
    })
}

const editEvent=(req,res)=>{
    const {id}=req.params
    eventModel.findByIdAndUpdate(id).then(result=>{
        if(result){
            res.status(201).send({
                message:'event properly updated',
                result,
            })
        }
    })
}

const deleteEvent =(req,res)=>{
    const {id}=req.params
    const query={$Set:req.body}
    eventModel.findByIdAndDelete(id,query).then(result=>{
        if(result){
            res.status(201).send({
                message:'event properly deleted'
            })
        }
    })
}   

const getFiltration = (req, res) => {
    const { month, day, year } = req.query;
    console.log(month, day, year);
    const date = `${year}-${month}-${day}`;
    console.log(date);
    var timeStamp = new Date(date);
    console.log(timeStamp);
    const dayEnd = timeStamp;
    dayEnd.setHours(dayEnd.getHours() + 23);
    dayEnd.setMinutes(dayEnd.getMinutes() + 59);
  
    eventModel
      .find({
        createdAt: {
          $gte: date,
          $lt: dayEnd,
        },
      })
      .then((result) => {
        if (!result) {
          return res.status(404).send("event not found");
        }
        return res.status(201).send(result);
      });
  };

  const getOnCategory=(req,res)=>{
    const {category}=req.query
    console.log(category)
    const regexPatteren=new RegExp(category,'i')
    eventModel.find({category:{$regex:regexPatteren}}).then(result=>{
        res.json(result)
    }).
    catch(err=>{
        res.status(500).json({ error: err.message });
    })
}

const rsvpEvent=async(req,res)=>{
    const { id } = req.params;

    try {
      const event = await eventModel.findById(id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.attendees.includes(req.user.id)) {
        return res.status(400).json({ message: 'Already RSVPed' });
      }
  
      event.attendees.push(req.user.id);
      await event.save();
      res.json(event);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
}

export default {
    addEvent,
    getEvent,
    editEvent,
    deleteEvent,
    getFiltration,
    getOnCategory,
    rsvpEvent,
}