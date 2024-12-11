import { v4, } from 'uuid';
import { Op, } from 'sequelize';

import { validBody, } from '../utils/validBody.js';
import { Room, Reservation, User, } from '../database/models/index.js';

async function createReservation(req, res) {
  const attributes = Reservation.getAttributes();
  if (!validBody(attributes, req.body, ['id', 'createdAt', 'updatedAt', 'RoomId', 'UserId',])) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Invalid body',
      });
  }

  const {
    startDate,
    endDate,
    nightsQuantity,
    status,
    totalPrice,
    UserId,
    RoomId,
  } = req.body;

  // Validar que no haya una reserva en el rango de fecha que queremos.
  const thereAreAnyReservation = await Reservation.findOne({
    where: {
      [Op.or]: [
        {
          startDate: {
            [Op.gte]: startDate, // >= startDate AND <= endDate
          },
        },
        {
          endDate: {
            [Op.lte]: endDate,
          },
        },
      ],
      RoomId,
    },
  });
  if (thereAreAnyReservation) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'There is a reservation in the range of dates',
      });
  }

  // TODO: OBTENER LOS DIAS QUE HAY ENTRE EL RANGO DE FECHAS DE STARTDATE Y ENDDATE

  const room = await Room.findByPk(RoomId);

  const reservation = {
    ...req.body,
    id: v4(),
    totalPrice: (nightsQuantity * room?.dataValues?.pricePerNight),
    RoomId,
    UserId: req.userId,
  };

  try {
    const createdReservation = await Reservation.create(reservation);

    return res
      .status(200)
      .json({
        success: true,
        reservation: createdReservation?.dataValues,
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function findAllReservations(req, res) {
  const {
    startDate,
    endDate,
  } = req.query;

  try {
    const reservations = await Reservation.findAll({
      ...(startDate && {
        where: {
          [Op.or]: {
            startDate: {
              [Op.gte]: startDate,
            },
          },
        },
      }),
      ...(endDate && {
        where: {
          [Op.or]: {
            endDate: {
              [Op.lte]: endDate, 
            },
          },
        },
      })
    });

    return res
      .status(200)
      .json({
        success: true,
        data: reservations,
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function findAllReservationsByUser(req, res) {
  try {
    const userReservations = await User.findAll({
      include: [
        {
          model: Room,
        },
      ],
      where: {
        id: req.userId,
      },
    });

    return res
      .status(200)
      .json({
        success: true,
        data: userReservations,
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

export {
  createReservation,
  findAllReservations,
  findAllReservationsByUser,
};