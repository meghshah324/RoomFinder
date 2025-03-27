import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String ,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    drequired: true,
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
