import { Router, } from 'express';

import {
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
} from '../controllers/backoffice.controller.js';

const router = Router();

router.get('/hotels', findHotels);

router.get('/hotels/:id', findHotelById);

router.post('/hotels', createHotel);

router.put('/hotels/:id', updateHotelById);

router.delete('/hotels/:id', deleteHotelById);

router.get('/rooms', findRooms);

router.get('/rooms/:id', findRoomById);

router.post('/rooms', createRoom);

router.put('/rooms/:id', updateRoom);

router.delete('/rooms/:id', deleteRoomById);

export default router;