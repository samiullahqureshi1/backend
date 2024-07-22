import tasks from "../controller/task.js";
import express from 'express'
const taskRouter=express.Router()
taskRouter.post('/',tasks.addTask)
taskRouter.get('/',tasks.getTask)
taskRouter.put('/:id',tasks.update)
taskRouter.delete('/delete',tasks.deleteTask)
taskRouter.put('/update/:id',tasks.updateSuggest)
taskRouter.get('/recommend/:userId',tasks.getSuggest)
taskRouter.get('/tags',tasks.getBooks)
export default taskRouter;