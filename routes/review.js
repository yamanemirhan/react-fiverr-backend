import express from 'express';
import { verifyToken } from '../middlewares/jwt.js';
import {
  createReview,
  getReviews,
  deleteReview,
} from '../controllers/review.js';

const router = express.Router();

router.post('/', verifyToken, createReview);
router.delete('/:gigId', deleteReview);
router.get('/:gigId', getReviews);

export default router;
