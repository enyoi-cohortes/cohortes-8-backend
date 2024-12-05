import { Op, } from 'sequelize';
import { v4, } from 'uuid';

import {
  Room,
  Hotel,
} from '../database/models/index.js';
import { validBody } from '../utils/validBody.js';

async function findHotels(req, res) {
  try {
    const hotels = await Hotel.findAll();

    return res
      .status(200)
      .json({
        success: true,
        data: hotels,
      });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function findHotelById(req, res) {
  const {
    id,
  } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Invalid id',
      });
  }

  try {
    const hotelById = await Hotel.findByPk(id);

    return res
      .status(200)
      .json({
        success: true,
        data: hotelById?.dataValues,
      });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function createHotel(req, res) {
  const attributes = Hotel.getAttributes();
  if (!validBody(attributes, req.body, ['id', 'createdAt', 'updatedAt'])) {
    return res
      .status(400)
      .json({
        message: 'Invalid body',
      });
  }

  const hotel = {
    ...req.body,
    id: v4(),
  }

  try {
    const createdHotel = await Hotel.create(hotel);

    return res
      .status(201)
      .json({
        success: true,
        data: createdHotel.dataValues,
      });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function updateHotelById(req, res) {
  const {
    id,
  } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Invalid id',
      });
  }

  const attributes = Hotel.getAttributes();
  if (!validBody(attributes, req.body, ['id', 'createdAt', 'updatedAt'])) {
    return res
      .status(400)
      .json({
        message: 'Invalid body',
      });
  }

  const currentHotel = await Hotel.findByPk(id);
  if (!currentHotel) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Hotel doesnt exists',
      });
  }

  const hotel = {
    ...currentHotel,
    ...req.body,
  };

  try {
    const updatedHotel = await Hotel.update(
      hotel,
      {
        where: {
          id,
        },
      },
    );

    return res
      .status(201)
      .json({
        success: true,
        data: updatedHotel,
      });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function deleteHotelById(req, res) {
  const {
    id,
  } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Invalid id',
      });
  }

  try {
    const deletedHotel = await Hotel.destroy({
      where: {
        id,
      },
    });

    return res
      .status(200)
      .json({
        success: true,
        data: deletedHotel,
      });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function findRooms(req, res) {
  try {
    const rooms = await Room.findAll();

    return res
      .status(200)
      .json({
        success: true,
        data: rooms,
      });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function findRoomById(req, res) {
  const {
    id,
  } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Invalid id',
      });
  }

  try {
    const roomById = await Room.findByPk(id);

    return res
      .status(200)
      .json({
        success: true,
        data: roomById?.dataValues,
      });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function createRoom(req, res) {
  const attributes = Room.getAttributes();
  if (!validBody(attributes, req.body, ['id', 'createdAt', 'updatedAt'])) {
    return res
      .status(400)
      .json({
        message: 'Invalid body',
      });
  }

  const {
    hotelId,
    codeName,
  } = req.body;

  const roomHotel = await Hotel.findByPk(hotelId);
  if (!roomHotel) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'The hotel for the room doesnt exists',
      });
  }

  const currentRoom = await Room.findOne({
    where: {
      codeName,
    },
  });
  if (currentRoom) {
    return res
      .status(400)
      .json({
        success: true,
        message: 'Cant create room because codeName exists',
      });
  }

  const room = {
    ...req.body,
    id: v4(),
    hotelId,
  }

  try {
    const createdRoom = await Room.create(room);

    return res
      .status(201)
      .json({
        success: true,
        data: createdRoom.dataValues,
      });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function updateRoom(req, res) {
  const {
    id,
  } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Invalid id',
      });
  }

  const attributes = Room.getAttributes();
  if (!validBody(attributes, req.body, ['id', 'createdAt', 'updatedAt'])) {
    return res
      .status(400)
      .json({
        message: 'Invalid body',
      });
  }

  const currentRoom = await Room.findByPk(id);
  if (!currentRoom) {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Hotel doesnt exists',
      });
  }

  const room = {
    ...currentRoom,
    ...req.body,
  };

  try {
    const updatedRoom = await Room.update(
      room,
      {
        where: {
          id,
        },
      },
    );

    return res
      .status(201)
      .json({
        success: true,
        data: updatedRoom,
      });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

async function deleteRoomById(req, res) {
  const {
    id,
  } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Invalid id',
      });
  }

  try {
    const deletedRoom = await Room.destroy({
      where: {
        id,
      },
    });

    return res
      .status(200)
      .json({
        success: true,
        data: deletedRoom,
      });
  } catch {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong',
      });
  }
}

export {
  findHotels,
  findHotelById,
  createHotel,
  updateHotelById,
  deleteHotelById,
  findRooms,
  findRoomById,
  createRoom,
  updateRoom,
  deleteRoomById,
}