import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, surname, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    surname,
    email,
    password,
  });

  delete user.password;

  return response.status(201).json(user);
});

export default usersRouter;
