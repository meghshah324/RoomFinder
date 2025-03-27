import Message from "../models/message.model.js";
import mongoose from "mongoose";
const { Types } = mongoose;

export const sendMessage = async (req, res) => {
  try {
    const { senderId,message, roomId , id } = req.body;
    const newMsg = new Message({
      roomId,
      senderId,
      message,
      id
    });
    await newMsg.save();
    res.status(201).json(newMsg);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(400).json({ error: "Room ID is required" });
    }
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
