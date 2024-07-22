import { Socket } from "socket.io";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatController = (socket, io) => {
    Socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  
    Socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  };

  const getData=(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.js'))
  }
  
  const sendMessage = (req, res) => {
    const message = req.body.message;
    console.log('Received message via HTTP: ' + message);
    res.status(200).send({ status: 'Message received' });
  };
  export default {
    chatController,
    getData,
    sendMessage,
  }