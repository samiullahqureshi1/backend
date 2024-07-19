import { taskModel } from "../model/task.js";
import OpenAI from "openai";

const addTask=(req,res)=>{
    const {userId,title,description,dueDate,priority,completed}=req.body
    const newData=new taskModel({
        userId,
        title,
        description,
        dueDate,
        priority,
        completed
    })
    newData.save().then(result=>{
        if(result){
            res.status(201).send(result)
        }
    })
}

const getTask=(req,res)=>{
    taskModel.find().then(result=>{
        if(result){
            res.status(201).send(result)
        }else{
            res.status(404).send('unable to send')
        }
    })
}


const update=(req,res)=>{
    const {id}=req.params
    const query={$set:req.body}
    taskModel.findByIdAndUpdate(id,query).then(result=>{
        if(result){
            res.status(201).send({
                message:'properly updated',
                result
            })
        }
    })
}

const deleteTask=(req,res)=>{
    const {id}=req.params
    const query={$set:req.body}
    taskModel.findByIdAndDelete(id,query).then(result=>{
        if(result){
            res.status(201).send({
                message:'properly deleted',
                result
            })
        }
    })
}
///suggetion on user behaviour
const openai=new OpenAI({
    apiKey:'api key'
})
const cache = new Map();

// Cache TTL in milliseconds (e.g., 1 hour)
const CACHE_TTL = 3600000;
const getSugestion=async(req,res)=>{
    const { id } = req.params;

    try {
        // Check cache first
        if (cache.has(id)) {
            const { data, timestamp } = cache.get(id);
            const isCacheValid = (Date.now() - timestamp) < CACHE_TTL;
            if (isCacheValid) {
                console.log('Returning cached data');
                return res.json({ suggestion: data });
            } else {
                // Invalidate the cache if it's stale
                cache.delete(id);
            }
        }

        // Fetch task from MongoDB
        const task = await taskModel.findById(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const userPrompt = req.body.userPrompt;
        console.log('User Prompt:', userPrompt);

        // Function to call OpenAI API with retry mechanism
        const callOpenAI = async (retries = 3, delay = 1000) => {
            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: userPrompt }],
                    max_tokens: 100,
                });
                return response.data.choices[0].message.content;
            } catch (error) {
                if (error.response && error.response.status === 429 && retries > 0) {
                    console.warn(`Rate limit exceeded. Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return callOpenAI(retries - 1, delay * 2);
                } else {
                    throw error;
                }
            }
        };

        const suggestion = await callOpenAI();

        // Store the response in cache
        cache.set(id, { data: suggestion, timestamp: Date.now() });

        res.json({ suggestion });

    } catch (error) {
        console.error('Error calling OpenAI API:', error);

        if (error.response) {
            console.error('Error details:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: 'Failed to suggest tasks. Please try again later.' });
        }
    }
}
export default {
    addTask,
    getTask,
    update,
    deleteTask,
    getSugestion
}