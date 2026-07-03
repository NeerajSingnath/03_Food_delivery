import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import dns from 'node:dns';

import dotenv from 'dotenv';
import connectDb from './config/db.js';
dotenv.config();
const PORT = process.env.PORT;
dns.setServers([process.env.DNS1, process.env.DNS2]);

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('This is our Food Delivery API');
});
app.listen(PORT, () => {
  connectDb();
  console.log('listening on port', PORT);
});
