import Message from "../models/message.model.js";

const createMessage = async (data) => {
  const { senderId, message, roomId , id } = data;
  const newMsg = new Message({
    roomId,
    senderId,
    message,
    id,
  });
  await newMsg.save();
  return newMsg;
};

export default createMessage;
