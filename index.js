import dotenv from "dotenv";
import express from "express";
import authRouter from "./Routes/router.js";
import { dbConnection } from "./db_connection.js";
const app = express();
dotenv.config();
dbConnection();

app.use(express.json());
app.use('/task',authRouter.task)
app.use("/signUp", authRouter.signUp);
app.use("/signIn", authRouter.signIn);


app.listen(7000, () => {
  console.log("server properly connected");
});
