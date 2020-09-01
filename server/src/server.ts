/* eslint-disable no-console */
import 'reflect-metadata';

import express from 'express';

import './database';

import routes from './routes';

console.clear();
const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} 🚀`);
});
