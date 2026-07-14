import express from 'express';
import {
  createAndEditShop,
  getMyShop,
} from '../controllers/shop.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const shopRouter = express.Router();

shopRouter.post(
  '/create-edit',
  isAuth,
  upload.single('shopImage'),
  createAndEditShop,
);
shopRouter.get('/my-shop', isAuth, getMyShop);

export default shopRouter;



