import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import listing from "./routes/listing.route.js";
import messageRoutes from "./routes/message.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import handleSocketConnection  from "./controllers/socket.controller.js";
import connectMongo from "./config/mongo.config.js";
import bodyParser from "body-parser";

dotenv.config();
connectMongo();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

handleSocketConnection(io);

app.use("/api/auth", authRouter);
app.use("/api/listing", listing);
app.use("/api", messageRoutes);
app.use("/api", conversationRoutes);


const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// httpServer
//   .listen(5000, () => {
//     console.log(`Server running on port ${3000}`);
//   })
//   .on("error", (err) => {
//     console.error("Failed to start server:", err.message);
//   });

// app.use((err,req,res,next) => {
//    const statusCode = err.statusCode || 500;
//    const messsage = err.message || 'Internal Server Error';
//    return res.status(statusCode).json({
//      success : false,
//      statusCode,
//      messsage
//    });
// });
