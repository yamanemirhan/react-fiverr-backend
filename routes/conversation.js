import express from 'express';
import {
  createConversation,
  getConversations,
  getConversation,
  updateConversation,
} from '../controllers/conversation.js';
import { verifyToken } from '../middlewares/jwt.js';

const router = express.Router();

router.post('/', verifyToken, createConversation);
router.put('/:id', verifyToken, updateConversation);
router.get('/:id', verifyToken, getConversation);
router.get('/', verifyToken, getConversations);

export default router;
