import { v4, } from 'uuid';
import { Op, } from 'sequelize';

import { User, } from '../database/models/index.js';
import { validBody, } from '../utils/validBody.js';
import { 
  jwtEncode,
  hashPassword, 
  verifyPassword, 
} from '../services/auth.service.js';

async function login(req, res) {
  const {
    email,
    password,
  } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({
        message: 'Invalid body',
      });
  }

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({
          message: 'User doesnt exist',
        });
    }

    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({
          message: 'Invalid credentials',
        });
    }

    const now = new Date();
    const expiresIn = new Date(new Date(now.getTime()).setHours(2)).getTime();

    const payload = {
      sub: user.id, // Subject es decir el dueño del token (usuario).
      iat: Math.floor(now.getTime() / 1000), // Iat fecha de creacion del token
      iss: process.env.APP_URL,
      // TODO: validate exp date
      exp: Math.floor(expiresIn / 1000), // Emisor del token
      name: `${user.givenName} ${user.familyName}`, // Claim custom
      nationalId: user.nationalId, // Claim custom
    };
    const token = await jwtEncode(payload);

    // TODO: generate token JWT
    return res
      .status(201)
      .json({
        message: 'Logged in',
        data: {
          token,
          expiresIn,
        },
      });
  } catch {
    return res
      .status(500)
      .json({
        message: 'Something went wrong',
      });
  }
}

async function signup(req, res) {
  const attributes = User.getAttributes();
  if (!validBody(attributes, req.body, ['id', 'createdAt', 'updatedAt'])) {
    return res
      .status(400)
      .json({
        message: 'Invalid body',
      });
  }

  const {
    email,
    nationalId,
    password,
  } = req.body;

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({
        message: 'Invalid password',
      });
  }

  try {
    const usersExists = await User.findOne({
      where: {
        [Op.or]: [
          {
            email,
          },
          {
            nationalId,
          },
        ],
      },
    });
    if (usersExists) {
      return res
        .status(400)
        .json({
          message: 'User exists',
        });
    }

    const encryptedPassword = await hashPassword(password, 16);
  
    const newUser = {
      ...req.body,
      id: v4(),
      password: encryptedPassword,
    };
    
    const createdUser = await User.create(newUser);
    if (!createdUser) {
      return res
        .status(500)
        .json({
          message: 'Something went wrong',
        });
    }
  
    return res
      .status(201)
      .json({
        message: 'User created',
        user: createdUser?.dataValues,
      });
  } catch {
    return res
      .status(500)
      .json({
        message: 'Something went wrong',
      });
  }
}

export {
  login,
  signup,
}