import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import  createList from "./routes/createList.route.js"
import findRooms from "./routes/residence.route.js"
dotenv.config();


mongoose
.connect("mongodb+srv://megh:megh@mern-roommatefinder.kqvzr.mongodb.net/mern-roommatefinder?retryWrites=true&w=majority&appName=MERN-Roommatefinder")
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/post',createList);
app.use('/api/rooms',findRooms);

app.use((err,req,res,next) => {
   const statusCode = err.statusCode || 500;
   const messsage = err.message || 'Internal Server Error';
   return res.status(statusCode).json({
     success : false,
     statusCode,
     messsage
   });
});

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err.message);
});
