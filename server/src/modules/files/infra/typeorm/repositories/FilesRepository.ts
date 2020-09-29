import { getRepository, Repository } from 'typeorm';

import IFilesRepository from '@modules/files/repositories/IFilesRepository';

import File from '../entities/File';

class FilesRepository implements IFilesRepository {
  private ormRepository: Repository<File>;

  constructor() {
    this.ormRepository = getRepository(File);
  }

  public async ListByUserId(user_id: string): Promise<File[]> {
    const files = await this.ormRepository.find({
      user_id,
    });

    return files;
  }

  public async findById(id: string): Promise<File> {
    const file = await this.ormRepository.findOne(id);

    return file;
  }

  public async create({
    name,
    original_filename,
    mime_type,
    user_id,
  }: File): Promise<File> {
    const file = this.ormRepository.create({
      name,
      original_filename,
      mime_type,
      user_id,
    });

    await this.ormRepository.save(file);

    return file;
  }

  public async delete(file: File): Promise<void> {
    await this.ormRepository.remove(file);
  }

  public async update(file: File): Promise<File> {
    await this.ormRepository.save(file);

    return file;
  }
}

export default FilesRepository;
