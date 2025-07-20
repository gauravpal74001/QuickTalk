import express from  "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import userRoutes from "./routes/user.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import chatsRoutes from "./routes/chats.js";
    

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI);

const app = express();
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res)=>{
    res.send("Hello World");
})

app.use("/user" , userRoutes);
app.use("/chats" , chatsRoutes);

app.use(errorMiddleware);

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
});


