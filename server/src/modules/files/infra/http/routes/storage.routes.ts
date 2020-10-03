import { Router } from 'express';
import StorageController from '../controllers/StorageController';

const storageRouter = Router();
const storageController = new StorageController();

storageRouter.get('/:file_id', storageController.show);

export default storageRouter;
