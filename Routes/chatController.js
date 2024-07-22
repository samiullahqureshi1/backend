import chat from '../controller/chatController.js'
import express from 'express'
const chatRouter=express.Router()
chatRouter.get('/',chat.getData)
chatRouter.post('/sendMessage',chat.sendMessage)

export default chatRouter;

