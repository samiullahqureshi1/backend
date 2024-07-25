import event from "../controller/event.js";
import express from 'express'
import authenticate from "../middleware/authenticate.js";
const eventRouter=express.Router()
eventRouter.post('/',authenticate,event.addEvent)
eventRouter.get('/',event.getEvent)
eventRouter.put('/:id',event.editEvent)
eventRouter.delete('/:id',event.deleteEvent)
eventRouter.get('/search', event.getFiltration)
eventRouter.get('/category',event.getOnCategory)
eventRouter.post('/:id/rsvp',authenticate,event.rsvpEvent)
export default eventRouter;