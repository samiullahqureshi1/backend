import student from "../controller/student.js";
import express from 'express'
const studentRouter=express.Router()
studentRouter.post('/',student.addStudent)
studentRouter.get('/name',student.getStudent)
studentRouter.delete('/',student.deleteStudents)

export default studentRouter