import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return next(createError(401, 'You are not authorized!'));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, 'Access Token is not valid!'));

    // assign user infos
    req.userId = payload.id;
    req.isSeller = payload.isSeller;

    next();
  });
};
