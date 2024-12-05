import { jwtVerify, } from '../services/auth.service.js';

async function authMiddleware(req, res, next) {
  const headers = req.headers;

  // Authorization: [Bearer, <token>]
  const [ , token, ] = (headers.authorization ?? '').split(" "); // = ["Bearer", "<token>"]
  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'Invalid token',
      });
  }

  const payload = await jwtVerify(token);
  if (!payload) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'Invalid token',
      });
  }

  req.userId = payload.sub;

  next();
}

export default authMiddleware;