import { Server, Socket } from "socket.io";

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinConversation", (roomId) => {
      socket.join(roomId);
    });
    socket.on("sendMessage", ({ roomId, message }) => {
      io.to(roomId).emit("receiveMessage", message);
    });
    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default handleSocketConnection;
