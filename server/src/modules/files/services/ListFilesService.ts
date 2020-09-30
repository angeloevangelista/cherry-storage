import { injectable, inject } from 'tsyringe';

import File from '@modules/files/infra/typeorm/entities/File';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ListFilesService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<File[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can upload files.');
    }

    const files = await this.filesRepository.ListByUserId(user_id);

    return files;
  }
}

export default ListFilesService;
