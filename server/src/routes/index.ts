import { Router } from 'express';

import usersRouter from './users.routes';
import filesRouter from './files.routes';
import storageRouter from './storage.routes';
import sessionsRouter from './sessions.routes';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/files', ensureAuthenticated, filesRouter);
routes.use('/storage', ensureAuthenticated, storageRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hey, you call me now 😉' });
});

export default routes;
