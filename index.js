import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import path from "path";
import http from 'http'
import authRouter from "./Routes/router.js";
import { dbConnection } from "./db_connection.js";
const app = express();
const server=http.createServer(app)
dotenv.config();
dbConnection();
const io =new Server(server)
app.use(express.static(path.resolve('./public')));
app.use(express.json());
app.use('/task',authRouter.task)
app.use("/signUp", authRouter.signUp);
app.use("/signIn", authRouter.signIn);
app.use('/flavour',authRouter.flavour)
app.use('/topping',authRouter.topping)
app.use('/iceCream',authRouter.iceCream)
app.use('/order',authRouter.order)
app.use('/admin',authRouter.admin)
app.use('/event',authRouter.event)
app.use('/property',authRouter.property)

//socket io connection
io.on("connection",(socket)=>{
  socket.on('user-message',message=>{
     io.emit('message',message)
  })
})


app.get('/',(req,res)=>{
  return res.sendFile('/public/index.html')
})


server.listen(8000, () => {
  console.log("server properly connected");
});


///this id and token for resv checking events
//66a2365d902b617cfb061c6e
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlMb2FkIjp7ImlkIjoiNjZhMjM2NWQ5MDJiNjE3Y2ZiMDYxYzZlIiwiZW1haWwiOiJhemxhbjExMUBnbWFpbC5jb20ifSwiaWF0IjoxNzIxOTA2ODg0LCJleHAiOjE3MzYzMzU2ODR9.ZGKHMzGY0BpQNZPuNRwOu_MDquW4i3qmdZAR0hBZ4sA
//"email":"azlan111@gmail.com",
   //"password":"azlan1"