import { Router } from 'express';

import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hey, you call me now 😉' });
});

export default routes;
