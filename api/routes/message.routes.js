import express from 'express'
import {getMessagesByConversation , createMessage } from '../controllers/Chat/message.controller.js'

const router = express.Router();

router.get('/conversations/:conversationId/messages', getMessagesByConversation);
router.post('/conversations/:conversationId/messages', createMessage);

export default router;

