import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import authRouter from "./routes/auth.route.js";
import listing from "./routes/listing.route.js";
import messageRoutes from "./routes/message.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";

import handleSocketConnection from "./controllers/socket.controller.js";
import connectMongo from "./config/mongo.config.js";

dotenv.config();
connectMongo();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

/* ---------------- CORS ---------------- */
const allowedOrigins = [
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRouter);
app.use("/api/listing", listing);
app.use("/api", messageRoutes);
app.use("/api", conversationRoutes);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ---------------- SOCKET.IO ---------------- */
const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

handleSocketConnection(io);

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
