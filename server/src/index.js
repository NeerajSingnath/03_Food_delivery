import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import dns from 'node:dns';

import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();
dns.setServers([process.env.DNS1, process.env.DNS2]);

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
