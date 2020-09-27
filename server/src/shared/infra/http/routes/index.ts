import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import filesRouter from '@modules/files/infra/http/routes/files.routes';
import storageRouter from '@modules/files/infra/http/routes/storage.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/files', ensureAuthenticated, filesRouter);
routes.use('/storage', ensureAuthenticated, storageRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hey, you call me now 😉' });
});

export default routes;
