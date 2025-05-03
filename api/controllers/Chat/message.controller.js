import Message from '../../models/message.model.js';

export const getMessagesByConversation = async (req, res) => {
  try {
    const query = { conversationId: req.params.conversationId };
    const messages = await Message.find(query).sort('createdAt');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMessage = async (req, res) => {
  console.log("createMessage", req.body, req.params);
  try {
    const { senderId, message} = req.body;
    const { conversationId } = req.params;
    const newMessage = new Message({
      conversationId,
      senderId,
      message
    });
    const saved = await newMessage.save();
    console.log("saved", saved);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
