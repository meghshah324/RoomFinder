import Conversation from '../../models/conversion.model.js';
import User from '../../models/user.model.js';

export const getOrCreateConversation = async (req, res) => {
  const { buyerId, sellerId, propertyId } = req.body;

  try {
    const conversation = await Conversation.findOneAndUpdate(
      { buyerId, sellerId, propertyId },
      { $setOnInsert: { buyerId, sellerId, propertyId } },
      { upsert: true, new: true }
    );

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getConversationsByProperty = async (req, res) => {
  const { propertyId } = req.params;
  
  if (!propertyId) {
    return res.status(400).json({ error: "Property ID is required" });
  }

  try {
    const conversations = await Conversation.find({ propertyId }).lean();
    
    if (!conversations.length) {
      return res.json([]);
    }

    const sellerIds = [...new Set(conversations.map(c => c.sellerId))];
    const buyerIds = [...new Set(conversations.map(c => c.buyerId))];

    const [sellers, buyers] = await Promise.all([
      User.find({ _id: { $in: sellerIds } }).select('_id username').lean(),
      User.find({ _id: { $in: buyerIds } }).select('_id username').lean()
    ]);

    const sellerMap = new Map(sellers.map(seller => [seller._id.toString(), seller]));
    const buyerMap = new Map(buyers.map(buyer => [buyer._id.toString(), buyer]));

      const formatted = conversations.map(conversation => {
      const seller = sellerMap.get(conversation.sellerId?.toString());
      const buyer = buyerMap.get(conversation.buyerId?.toString());

      return {
        _id: conversation._id,
        buyerId: conversation.buyerId,
        buyerName: buyer?.username || 'Deleted User',
        sellerId: conversation.sellerId,
        sellerName: seller?.username || 'Deleted User',
        propertyId: conversation.propertyId,
        createdAt: conversation.createdAt
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching conversations:', err);
    res.status(500).json({ 
      error: "Failed to fetch conversations",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
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
