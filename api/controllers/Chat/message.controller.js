import Message from '../../models/message.model.js';
import {encryptMessage , decryptMessage} from '../../utils/crypto.js';

export const getMessagesByConversation = async (req, res) => {
  try {
    const query = { conversationId: req.params.conversationId };
    const messages = await Message.find(query).sort('createdAt');

 
    messages.forEach((message) =>{
 
      const decryptedMessage = decryptMessage(message.message);
      message.message = decryptedMessage;
      console.log("Decrypted message:", decryptedMessage);
    })

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { senderId, message} = req.body;
    const { conversationId } = req.params;

    const encryptedMessage =encryptMessage(message);


    const newMessage = new Message({
      conversationId,
      senderId,
      message : encryptedMessage,
    });

    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
