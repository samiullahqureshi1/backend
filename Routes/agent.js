import agent from "../controller/agent.js";
import express from 'express'
const agentRouter=express.Router()
agentRouter.post('/',agent.addAgent)
agentRouter.get('/',agent.findAgent)
agentRouter.delete('/',agent.deleteAgent)
export default agentRouter;