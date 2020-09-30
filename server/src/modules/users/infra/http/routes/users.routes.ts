import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import avatarsUploadConfig from '@config/avatarsUpload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(avatarsUploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, surname, email, password } = request.body;

  const createUserService = container.resolve(CreateUserService);

  const user = await createUserService.execute({
    name,
    surname,
    email,
    password,
  });

  delete user.password;

  return response.status(201).json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
      avatarMimeType: request.file.mimetype,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
