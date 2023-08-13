import createError from '../utils/createError.js';
import Order from '../models/order.js';
import Gig from '../models/gig.js';
import Stripe from 'stripe';

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  const payment_intent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: payment_intent.id,
  });

  await newOrder.save();

  res.status(200).send({ clientSecret: payment_intent.client_secret });
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send('Order has been confirmed.');
  } catch (err) {
    next(err);
  }
};
