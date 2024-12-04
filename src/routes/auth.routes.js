import { Router, } from 'express';

import {
  login,
  signup,
} from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

// Forma no. 3. Utilizar middleware local, es decir, en cada ruta.
router.post('/signup', signup);

router.post('/login', login);

export default router;