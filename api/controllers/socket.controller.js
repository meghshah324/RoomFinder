import { Server, Socket } from "socket.io";
import createMessage from "../services/messageService.js";

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });
    socket.on("sendMessage", ({ conversationId, message }) => {
      // Send message to all users in this conversation
      io.to(conversationId).emit("receiveMessage", message);
    });
    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default handleSocketConnection;
