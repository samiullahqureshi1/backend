import { studentModel } from "../model/student.js";

const addStudent=async(req,res)=>{
    const {name,age,subjects,total}=req.body
    
    const data=await new studentModel({
        name, 
        age,
        subjects,
        total,
    })
    await data.save().then(result=>{
        if(result){
            res.status(201).send(result)
        }
    })
}
const getStudent = async (req, res) => {
  try {
    const students = await studentModel.aggregate([
      {
        $addFields: {
          totalCalculated: {
            $add: ["$subjects.math", "$subjects.physics", "$subjects.chemistry", "$subjects.biology", "$subjects.english"]
          },
          averagePercentage: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: ["$subjects.math", "$subjects.physics", "$subjects.chemistry", "$subjects.biology", "$subjects.english"]
                  },
                  "$total"
                ]
              },
              100
            ]
          }
        }
      },
      {
        $match: {
          averagePercentage: { $gt: 50 }
        }
      },
      {
        $project: {
          name: 1,
          age: 1,
          subjects: 1,
          totalCalculated: 1,
          averagePercentage: 1
        }
      }
    ]);

    console.log('Filtered Students:', students);
    res.status(200).send(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send({ message: 'Error fetching students', error });
  }
};

const deleteStudents=(req,res)=>{
  
  studentModel.deleteMany().then(result =>{
    if(result){
      res.status(201).send('properly deleted')
    }
  })
}

export default {
    addStudent,
    getStudent,
    deleteStudents,
}