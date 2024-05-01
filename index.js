const express=require('express')
const app=express()
const mongoose=require('mongoose')
let routers_login=require('./route/router_login.js')


mongoose
    .connect(`mongodb+srv://RM:RM@cluster0.ymcif.mongodb.net/sami_db_playground`, {
      
    })  
    .then(() => {
      console.log("connected");
    })
    .catch((error) => {
      console.log("not connected");
    });

    app.use(express.json())
    app.use('/logins',routers_login)

app.listen(6000,()=>{
    console.log('server properly connected')
})