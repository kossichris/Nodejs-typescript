import { Router } from 'express';

import { ROLE } from '../constants/user-role';

import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize.middleware';
import { validate } from '../middlewares';
import {
  createRentSchema,
  deleteRentSchema,
  getRentSchema,
  updateRentSchema,
} from '../schemas/rent.schema';
import {
  createRentHandler,
  deleteRentHandler,
  getAllRentsHandler,
  getRentHandler,
  updateRentHandler,
} from '../controllers/rent.controller';

const rentRouter = Router();

// Route to create a rent
rentRouter.post(
  '/',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(createRentSchema),
  createRentHandler
);

//Route to fetch a rent
rentRouter.get('/:id', authenticate, validate(getRentSchema), getRentHandler);

//Route to update a rent
rentRouter.patch(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(updateRentSchema),
  updateRentHandler
);

//Route to delete a rent
rentRouter.delete(
  '/:id',
  authenticate,
  authorize([ROLE.AUTHOR]),
  validate(deleteRentSchema),
  deleteRentHandler
);

//Route to get all the rents
rentRouter.get('/', authenticate, getAllRentsHandler);

export default rentRouter;
