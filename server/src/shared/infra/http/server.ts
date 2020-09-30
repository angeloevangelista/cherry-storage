/* eslint-disable no-console */
import 'reflect-metadata';

import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import AppError from '@shared/errors/AppError';
import routes from './routes';

console.clear();
const port = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.warn(err.message);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.use(
  '/public/avatars',
  express.static(path.resolve(__dirname, '..', 'files', 'avatars')),
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} 🚀`);
});
