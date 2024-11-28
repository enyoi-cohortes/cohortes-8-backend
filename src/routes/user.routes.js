// CRUD -> Create Read Update Delete
// Router -> Conjunto de rutas.
import { Router, } from 'express';

import {
  createUser,
  findUsers,
  updateUser,
  deleteUser,
  findUser,
} from '../controllers/user.controller.js';

const router = Router();

/**
 * 
 * user = {
 *  name: 'Brian',
 *  country: 'Colombia',
 * };
 * 
 * PUT - The PUT method replaces all current representations of the target resource with the request.
 * 
 * user = {
 *  name: 'Pepe',
 *  country: 'Peru',
 * }
 * 
 * PATCH - The PATCH method applies partial modifications to a resource.
 * 
 * user = {
 *  country: 'Estados Unidos',
 * }
 * 
 */

// Create
router.post('/', createUser);

// Read
router.get('/', findUsers);

router.get('/:id', findUser);

// Update
router.put('/:id', updateUser);

// Delete
router.delete('/:id', deleteUser);

export default router;