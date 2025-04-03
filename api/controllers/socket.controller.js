import { Server, Socket } from "socket.io";
import createMessage from "../services/messageService.js";

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    // console.log("User connected:", socket.id);
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    });
    socket.on("sendMessage", async (data) => {
      const { roomId, senderId, message , id} = data;
      const newMsg = await createMessage(data);
      io.to(data.roomId).emit("receivedMessage", data);
    });
    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default handleSocketConnection;
