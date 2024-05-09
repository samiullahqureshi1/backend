import event from "../controller/event.js";
import express from 'express'
const EventRouter=express.Router();

EventRouter.post('/add',event.addEvent)
EventRouter.get('/find',event.getEvent)
EventRouter.get('/:id',event.getSingleEvent)
EventRouter.put('/update/:id',event.editEvent)
EventRouter.delete('/delete/:id',event.deleteEvent)
EventRouter.get('/',event.getFiltration)
export default EventRouter;