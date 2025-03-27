import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongo = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
export default connectMongo;
