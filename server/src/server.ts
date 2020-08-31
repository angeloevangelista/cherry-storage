/* eslint-disable no-console */
import 'reflect-metadata';

import express from 'express';

import './database';

console.clear();
const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'Hey, you call me now 😉' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} 🚀`);
});
