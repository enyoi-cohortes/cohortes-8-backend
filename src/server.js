import 'dotenv/config';
import morgan from 'morgan';
import http from 'node:http';
import express from 'express';

import './database/connection.js';

import userRouter from './routes/user.routes.js';

async function main() {
  const app = express();

  const port = process.env.APP_PORT ?? 3000;

  app.use(morgan('dev'));
  app.use(express.json());

  app.use('/users', userRouter);

  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log('Server running on port: ', port);
  });
}

main()
  .catch(err => console.error(err));