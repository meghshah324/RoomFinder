import express from 'express';
import {
  getConversationsByProperty,
  getConversationById,
  getOrCreateConversation
} from '../controllers/Chat/conversation.controller.js';

const router = express.Router();

router.post('/conversations/get-or-create', getOrCreateConversation);
router.get('/conversations/property/:propertyId', getConversationsByProperty);
router.get('/conversations/:conversationId', getConversationById);

export default router;
