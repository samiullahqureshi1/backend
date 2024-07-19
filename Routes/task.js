import tasks from "../controller/task.js";
import express from 'express'
const taskRouter=express.Router()
taskRouter.post('/',tasks.addTask)
taskRouter.get('/',tasks.getTask)
taskRouter.put('/:id',tasks.update)
taskRouter.delete('/:id',tasks.deleteTask)
taskRouter.get('/:id',tasks.getSugestion)
export default taskRouter;