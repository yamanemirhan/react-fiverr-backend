import express from 'express';
import { verifyToken } from '../middlewares/jwt.js';
import { getOrders, intent, confirm } from '../controllers/order.js';

const router = express.Router();

router.post('/create-payment-intent/:id', verifyToken, intent);
router.put('/', verifyToken, confirm);
router.get('/', verifyToken, getOrders);

export default router;
