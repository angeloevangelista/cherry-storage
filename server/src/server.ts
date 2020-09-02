/* eslint-disable no-console */
import 'reflect-metadata';

import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import './database';

import routes from './routes';

import AppError from './errors/AppError';

console.clear();
const port = process.env.PORT || 3333;
const app = express();

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
