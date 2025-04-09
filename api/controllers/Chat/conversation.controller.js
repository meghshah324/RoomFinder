import Conversation from '../../models/conversion.model.js';

export const getOrCreateConversation = async (req, res) => {
  const { buyerId, sellerId, propertyId } = req.body;

  try {
    let conversation = await Conversation.findOne({ buyerId, sellerId, propertyId });

    if (!conversation) {
      conversation = new Conversation({ buyerId, sellerId, propertyId });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getConversationsByProperty = async (req, res) => {
  try {
    const conversations = await Conversation.find({ propertyId: req.params.propertyId })
      .populate('buyerId', 'name')
      .populate('sellerId', 'name');
    const formatted = conversations.map(c => ({
      _id: c._id,
      buyerId: c.buyerId._id,
      buyerName: c.buyerId.name,
      sellerId: c.sellerId._id,
      sellerName: c.sellerId.name,
      propertyId: c.propertyId,
      createdAt: c.createdAt
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const convo = await Conversation.findById(req.params.conversationId)
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email')
      .populate('propertyId');
    res.json(convo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
