import express from 'express';
import {
  addItem,
  editItem,
  getItemByID,
} from '../controllers/item.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const itemRouter = express.Router();

itemRouter.post('/add-item', isAuth, upload.single('image'), addItem);
itemRouter.put('/edit-item/:itemId', isAuth, upload.single('image'), editItem);
itemRouter.post('/get-item/:itemId', isAuth, getItemByID);

export default itemRouter;
