import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  S3StorageProvider,
);
