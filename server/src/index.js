import express from 'express';
import dns from 'node:dns';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

dns.setServers([process.env.DNS1, process.env.DNS2]);

const app = express();

app.get('/', (req, res) => {
  res.send('This is our Food Delivery API');
});
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
