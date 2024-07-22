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
io.on("connection",(socket)=>{
  socket.on('user-message',message=>{
     io.emit('message',message)
  })
})


app.get('/',(req,res)=>{
  return res.sendFile('/public/index.html')
})


server.listen(7000, () => {
  console.log("server properly connected");
});
