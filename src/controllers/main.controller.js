import { Op, } from 'sequelize';

import {
  Room,
  User,
  Hotel,
} from '../database/models/index.js';

async function findResultsBySearch(req, res) {
  const {
    value,
    order,
    limit = 5,
  } = req.query;

  const searchValue = (value ?? '')
    ?.trim()
    .toLowerCase();

  try {
    const roomAttributes = Room.getAttributes();
    const userAttributes = User.getAttributes();
    const hotelAttributes = Hotel.getAttributes();

    const hotels = await Hotel.findAll({
      ...(value && {
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
            {
              country: {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
            {
              city: {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
            {
              address: {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
          ],
          [Op.and]: {
            active: {
              [Op.eq]: true,
            },
          },
        },
      }),
      ...(limit && {
        limit,
      }),
      ...(order && Object.keys(hotelAttributes).includes(order) && {
        order: [order,],
      }),
    });

    const rooms = await Room.findAll({
      ...(value && {
        where: {
          [Op.or]: [
            {
              codeName: {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
          ],
        },
      }),
      ...(limit && {
        limit,
      }),
      ...(order && Object.keys(roomAttributes).includes(order) && {
        order: [order,],
      }),
    });

    const users = await User.findAll({
      ...(value && {
        where: {
          [Op.or]: [
            {
              email: {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
            {
              givenName: {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
            {
              familyName: {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
          ],
        },
      }),
      ...(limit && {
        limit,
      }),
      ...(order && Object.keys(userAttributes).includes(order) && {
        order: [order,],
      }),
    });

    return res
      .status(200)
      .json({
        sucess: true,
        data: {
          users,
          rooms,
          hotels,
        },
      });
  } catch (err) {
    console.log(JSON.stringify(err));
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

export {
  findResultsBySearch,
};