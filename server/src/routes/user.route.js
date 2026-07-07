import express from 'express';
import { getCurrentUser } from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/get-current-user', isAuth, getCurrentUser);

export default userRouter;
