import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// IMPORT ROUTES
import userRoute from './routes/user.js';
import reviewRoute from './routes/review.js';
import orderRoute from './routes/order.js';
import messageRoute from './routes/message.js';
import gigRoute from './routes/gig.js';
import conversationRoute from './routes/conversation.js';
import authRoute from './routes/auth.js';
import customErrorHandler from './middlewares/customErrorHandler.js';

const app = express();

dotenv.config();

mongoose.set('strictQuery', true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.log(err);
  }
};

// MIDDLEWARES
app.use(
  cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// USE THE ROUTES
app.use('/api/users', userRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/orders', orderRoute);
app.use('/api/messages', messageRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/auth', authRoute);

app.use(customErrorHandler);

app.listen(5000, () => {
  connect();
  console.log('Server is running on PORT: 5000');
});
