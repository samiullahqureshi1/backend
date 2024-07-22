import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import http from 'http'
import authRouter from "./Routes/router.js";
import { dbConnection } from "./db_connection.js";
const app = express();
const server=http.createServer(app)
dotenv.config();
dbConnection();
const io =new Server(server)
app.use(express.static('public'));
app.use(express.json());
app.use('/task',authRouter.task)
app.use("/signUp", authRouter.signUp);
app.use("/signIn", authRouter.signIn);
app.use('/chat',authRouter.chat)
io.on('connection', (socket) => {
  console.log('a user connected');
  chatController.chatController(socket, io);
});


server.listen(7000, () => {
  console.log("server properly connected");
});
