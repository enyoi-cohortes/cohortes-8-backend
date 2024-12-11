import { Router, } from 'express';

import {
  findResultsBySearch,
} from '../controllers/main.controller.js';

const router = Router();

router.get('/search', findResultsBySearch);

export default router;