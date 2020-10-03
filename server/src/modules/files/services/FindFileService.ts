import { validate } from 'uuid';
import { injectable, inject } from 'tsyringe';

import File from '@modules/files/infra/typeorm/entities/File';

import AppError from '@shared/errors/AppError';

import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  file_id: string;
}

@injectable()
class FindFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, file_id }: IRequest): Promise<File> {
    if (!validate(file_id)) {
      throw new AppError('Invalid file_id.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can delete files.');
    }

    const file = await this.filesRepository.findById(file_id);

    if (file) {
      file.url = `${process.env.AWS_S3_URL}/storage/${file.name}`;
    }

    return file;
  }
}

export default FindFileService;
