import ICreateFileDTO from '@modules/files/dtos/ICreateFileDTO';
import File from '@modules/files/infra/typeorm/entities/File';

export default interface IFilesRepository {
  findById(id: string): Promise<File | undefined>;
  ListByUserId(user_id: string): Promise<File[] | undefined>;
  create(data: ICreateFileDTO): Promise<File>;
  delete(data: File): Promise<void>;
  update(data: File): Promise<File>;
}
