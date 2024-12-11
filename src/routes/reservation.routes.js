import { Router, } from 'express';

import {
  createReservation,
  findAllReservations,
  findAllReservationsByUser,
} from '../controllers/reservation.controller.js';

const router = Router();

router.post('/', createReservation);

router.get('/', findAllReservations);

router.get('/user', findAllReservationsByUser);

export default router;