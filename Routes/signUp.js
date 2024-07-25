import signUp from "../controller/signUp.js";
import express from 'express'
import user from "../validations/user.js";
const signUpRouter=express.Router();
signUpRouter.post('/',user.userSignup,signUp)

export default signUpRouter;

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlMb2FkIjp7ImlkIjoiNjZhMTA5MzljMTZjNDQ1MDg1YWRhNTJkIiwiZW1haWwiOiJhaHNhbkBnbWFpbC5jb20ifSwiaWF0IjoxNzIxODI5NzM5LCJleHAiOjE3MzYyNTg1Mzl9.m14SluwyEas-DjmkZn77-w35yssvGX0HcCmcQuaCIyY