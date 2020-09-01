import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, surname, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, surname, email, password });

  // delete user.password;

  user.password = '';

  return response.status(201).json(user);
});

export default usersRouter;
