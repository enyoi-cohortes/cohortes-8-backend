import 'dotenv/config';
import morgan from 'morgan';
import http from 'node:http';
import express from 'express';

import './database/connection.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import backofficeRouter from './routes/backoffice.routes.js';

import authMiddleware from './middlewares/auth.middleware.js';
import adminMiddleware from './middlewares/admin.middleware.js';

async function main() {
  const app = express();

  const port = process.env.APP_PORT ?? 3000;

  app.use(morgan('dev'));
  app.use(express.json());

  app.use('/auth', authRouter);
  app.use('/users', authMiddleware, userRouter);
  app.use('/backoffice', authMiddleware, adminMiddleware, backofficeRouter);

  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log('Server running on port: ', port);
  });
}

main()
  .catch(err => console.error(err));