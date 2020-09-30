import { Router } from 'express';
import multer from 'multer';

import UsersController from '../controllers/UsersController';

import avatarsUploadConfig from '@config/avatarsUpload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(avatarsUploadConfig);
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersController.updateAvatar,
);

export default usersRouter;
