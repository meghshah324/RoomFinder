import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"
import listing from "./routes/listing.route.js"
import cors from 'cors';

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
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api/auth',authRouter);
app.use('/api/listing',listing);

// app.use((err,req,res,next) => {
//    const statusCode = err.statusCode || 500;
//    const messsage = err.message || 'Internal Server Error';
//    return res.status(statusCode).json({
//      success : false,
//      statusCode,
//      messsage
//    });
// });

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err.message);
});
