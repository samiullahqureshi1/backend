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
    const {name}=req.query;
    eventModel.find({name:name}).then(result=>{
        if(!result){
            return res.status(404).send('event not found')
        }
        return res.status(201).send(result)
    })
}
export default {addEvent,getEvent,getSingleEvent,editEvent,deleteEvent,getFiltration};