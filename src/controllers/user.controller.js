import { v4, } from 'uuid';

import { User, } from '../database/models/index.js';

const validBody = (
  attributes, 
  body, 
  skipFields = [],
) => {
  let isValidBody = true;
  Object.entries(attributes).forEach(([key, value,]) => {
    if (skipFields.includes(key)) return;

    if (!value?.allowNull && !body[key]) {
      isValidBody = false;
    } else {
      isValidBody = true;
    }
  });

  return isValidBody;
}

async function createUser(req, res) {
  const attributes = User.getAttributes();
  if(!validBody(attributes, req.body, ['id', 'createdAt', 'updatedAt'])) {
    return res
      .status(400)
      .json({
        message: 'Invalid body',
      });
  }

  // TODO: crear validacion del email y de otros datos.

  const newUser = {
    ...req.body,
    id: v4(),
  };

  const userCreated = await User.create(newUser);
  if (!userCreated) {
    return res
      .status(500)
      .json({
        message: 'Something went wrong',
      });
  }

  return res.json({
    message: 'User created',
    user: userCreated?.dataValues,
  });
}

async function findUser(req, res) {
  const {
    id,
  } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        message: 'Malformed request',
      });
  }

  const user = await User.findByPk(id);
  if (!user) {
    return res
      .status(404)
      .json({
        message: 'User not found',
      });
  }

  return res
    .status(200)
    .json({
      data: user?.dataValues,
    });
}

async function findUsers(req, res) {
  const users = await User.findAll();
  if (!users || users.length === 0) {
    return res
      .status(404)
      .json({
        message: 'Not users',
      });
  }

  return res
    .status(200)
    .json({
      data: users,
    });
}

async function updateUser(req, res) {
  const { id, } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        message: 'Malformed request',
      });
  }

  const attributes = User.getAttributes();
  if (!validBody(attributes, req.body, ['id', 'nationalId', 'createdAt', 'updatedAt'])) {
    return res
      .status(400)
      .json({
        message: 'Invalid body',
      });
  }

  const user = await User.findByPk(id);
  if (!user) {
    return res
      .status(404)
      .json({
        message: 'User not found',
      });
  }

  const updatedUser = await User.update(
    {
      ...user,
      ...req.body,
    },
    {
      where: {
        id,
      },
    },
  );
  if (!updatedUser) {
    return res
      .status(500)
      .json({
        message: 'Something went wrong',
      });
  }

  return res
    .status(201)
    .json({
      message: 'User updated',
      user: updatedUser,
    });
}

async function deleteUser(req, res) {
  const {
    id,
  } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        message: 'Malformed request',
      });
  }

  const user = await User.findByPk(id);
  if (!user) {
    return res
      .status(404)
      .json({
        message: 'User not found',
      });
  }

  const deletedUser = await User.destroy({
    where: {
      id,
    },
  });

  return res
    .status(201)
    .json({
      message: 'User deleted',
      user: deletedUser,
    });
}

export {
  createUser,
  findUser,
  findUsers,
  updateUser,
  deleteUser,
};