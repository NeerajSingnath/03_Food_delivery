import express from 'express';
import { createAndEditShop } from '../controllers/shop.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const shopRouter = express.Router();

shopRouter.post(
  '/create-shop',
  isAuth,
  upload.single('shopImage'),
  createAndEditShop,
);

export default shopRouter;
