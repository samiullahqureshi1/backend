import { taskModel } from "../model/task.js";


const addTask=(req,res)=>{
    const {userId,title,description,dueDate,priority,completed,lastAccessed,timesAccessed,completionTime,frequency,tags}=req.body
    const newData=new taskModel({
        userId,
        title,
        description,
        dueDate,
        priority,
        completed,
        lastAccessed,
        timesAccessed,
        completionTime,
        frequency,
        tags,
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
    //const {id}=req.params
  //  const query={$set:req.body}
    taskModel.deleteMany().then(result=>{
        if(result){
            res.status(201).send({
                message:'properly deleted',
                result
            })
        }
    })
}
///suggetion on user behaviour
// --- Logistic Regression Implementation ---

class CollaborativeFiltering {
    constructor(userTaskMatrix) {
        this.userTaskMatrix = userTaskMatrix;
        this.similarityMatrix = this.calculateSimilarityMatrix();
    }

    calculateSimilarityMatrix() {
        const users = Object.keys(this.userTaskMatrix);
        const similarityMatrix = {};

        if (users.length < 2) {
            console.log('Not enough users for similarity calculation.');
            return similarityMatrix;
        }

        users.forEach(user1 => {
            similarityMatrix[user1] = {};
            users.forEach(user2 => {
                if (user1 !== user2) {
                    similarityMatrix[user1][user2] = this.cosineSimilarity(
                        Object.values(this.userTaskMatrix[user1]),
                        Object.values(this.userTaskMatrix[user2])
                    );
                }
            });
        });

        return similarityMatrix;
    }

    cosineSimilarity(vec1, vec2) {
        const dotProduct = vec1.reduce((sum, val, i) => sum + (val * (vec2[i] || 0)), 0);
        const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + (val * val), 0));
        const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + (val * val), 0));
        return (magnitude1 && magnitude2) ? (dotProduct / (magnitude1 * magnitude2)) : 0;
    }

    recommend(userId, topN = 5) {
        const userRatings = this.userTaskMatrix[userId];
        if (!userRatings) {
            console.log(`No ratings found for user ${userId}`);
            return [];
        }

        const recommendations = {};
        const userSimilarities = this.similarityMatrix[userId] || {};

        Object.keys(userSimilarities).forEach(otherUserId => {
            const similarity = userSimilarities[otherUserId];
            const otherUserRatings = this.userTaskMatrix[otherUserId];

            Object.keys(otherUserRatings).forEach(task => {
                if (!userRatings[task]) {
                    if (!recommendations[task]) {
                        recommendations[task] = 0;
                    }
                    recommendations[task] += similarity * otherUserRatings[task];
                }
            });
        });

        return Object.entries(recommendations)
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
            .slice(0, topN)
            .map(([task]) => task);
    }
}

//---// API Routes ---

const updateSuggest = async (req, res) => {
    try {
        const todo = await taskModel.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Task not found' });

        // Predict priority based on current features
        const features = [todo.timesAccessed, todo.completionTime, todo.frequency];
        const priority = logisticModel.predict([features])[0];
        todo.priority = reversePriorityMap[priority];

        // Update task with request body data
        Object.assign(todo, req.body);
        await todo.save();

        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSuggest = async (req, res) => {
    try {
        const todos = await taskModel.find({});
        console.log('Todos:', todos);

        if (todos.length === 0) {
            return res.status(404).json({ message: 'No tasks found' });
        }

        const userTaskMatrix = {};
        

        todos.forEach(todo => {
            const userId = todo.userId.toString(); // Convert ObjectId to string
            if (!userTaskMatrix[userId]) {
                userTaskMatrix[userId] = {};
            }
            userTaskMatrix[userId][todo.title] = todo.frequency;
        });

        console.log('User Task Matrix:', userTaskMatrix);

        // Check for sufficient data
        if (Object.keys(userTaskMatrix).length < 2) {
            return res.status(404).json({ message: 'Not enough data for recommendations' });
        }

        const cf = new CollaborativeFiltering(userTaskMatrix);
        const recommendations = cf.recommend(req.params.userId);

        if (recommendations.length === 0) {
            return res.status(404).json({ message: 'No recommendations found' });
        }

        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBooks=async(req,res)=>{
    const {userId,tag}=req.query
    try {
        const userTasks = await taskModel.find({ userId, tags: tag });

        // Fetch similar tasks from other users
        const similarTasks = await taskModel.find({ tags: tag, userId: { $ne: userId } });

        // Combine user tasks and similar tasks for recommendations
        const recommendations = similarTasks.map(task => ({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            tags: task.tags
        }));

        res.json({ userTasks, recommendations });
    } catch (error) {
        res.status(500).send({message:error.message})
    }    
}


export default {
    addTask,
    getTask,
    update,
    deleteTask,
    getSuggest,
    updateSuggest,
    getBooks,
}