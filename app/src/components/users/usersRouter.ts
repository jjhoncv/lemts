import { Router, Request, Response } from 'express';
import { asyncHandler } from './../../utils';
import { getUsers } from './usersController';

const router: Router = Router();

router.get('/', getUsers);

export const usersRouter: Router = router;
