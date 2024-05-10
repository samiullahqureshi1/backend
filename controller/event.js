import { eventModel } from "../model/eventSchema.js";



const addEvent =(req,res)=>{
    const {name,date}=req.body;
    const event=new eventModel({
        name,
        date,
    })
    event.save().then(
        res.status(201).send('event created')
    )
    .catch(err=>{
        res.status(404).send('not created')
    })
}


const getEvent=(req,res)=>{
    eventModel.find()
    .then(events=>{
        res.status(201)
        .send(events)
    }).catch(err=>{
        res.status(404).send('no event exist')
    })
    
};

const getSingleEvent=(req,res)=>{
    const {id}=req.params;
    eventModel.findOne({_id:id}).then(result=>{
        if(!result){
            return res.status(404).send('event not found')
        }
        return res.status(201).send(result)
    })
}

const editEvent=(req,res)=>{
    const {id}=req.params;
    const query={$set:req.body}
    eventModel.findByIdAndUpdate(id,query).then(result=>{
        if(result){
            res.status(201).send({
                message:"successfully updated",
                result
            })
        }
    }).catch(error=>{
        console.log('unable to update')
    })
}

const deleteEvent=(req,res)=>{
    const {id}=req.params;
    eventModel.findByIdAndDelete(id).then(result=>{
        if(result){
            res.status(201)
            .send('event deleted successfully')
        }else{
            res.status(404)
            .send('Event Not Deleted')
        }
    })
}

const getFiltration=(req,res)=>{
    const {month,day,year}=req.query;
    console.log(month,day,year)
    const date=`${year}-${month}-${day}`
    console.log(date)
    var timeStamp= new Date(date);
    console.log(timeStamp)
    const dayEnd=timeStamp
    // Add hours (for example, add 2 hours)
dayEnd.setHours(dayEnd.getHours() + 23);

// Add minutes (for example, add 30 minutes)
dayEnd.setMinutes(dayEnd.getMinutes() + 59);

    eventModel.find({createdAt:{
        $gte:date,
        $lt:dayEnd,
    }}).then(result=>{
        if(!result){
            return res.status(404).send('event not found')
        }
        return res.status(201).send(result)
    })
}
export default {addEvent,getEvent,getSingleEvent,editEvent,deleteEvent,getFiltration};