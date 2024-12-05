import { User, } from '../database/models/index.js';

async function adminMiddleware(req, res, next) {
  const userId = req.userId;
  if (!userId) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'Not user in request',
      });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'User doesnt exits',
      });
  }

  if (!user?.isAdmin) {
    return res
      .status(403)
      .json({
        success: false,
        message: 'Invalid permissions',
      });
  }

  next();
}

export default adminMiddleware;