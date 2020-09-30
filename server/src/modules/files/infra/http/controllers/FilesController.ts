import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFileService from '@modules/files/services/CreateFileService';
import UpdateFileService from '@modules/files/services/UpdateFileService';
import DeleteFileService from '@modules/files/services/DeleteFileService';
import FindFileService from '@modules/files/services/FindFileService';
import ListFilesService from '@modules/files/services/ListFilesService';

class FilesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listFilesService = container.resolve(ListFilesService);

    const files = await listFilesService.execute(request.user.id);

    files.forEach((file) => {
      file.url = `${process.env.AWS_S3_URL}/storage/${file.name}`;
    });

    return response.json(files);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { file_id } = request.params;

    const findFileService = container.resolve(FindFileService);

    const file = await findFileService.execute({
      user_id: request.user.id,
      file_id,
    });

    return response.json(file);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createFileService = container.resolve(CreateFileService);

    const file = await createFileService.execute({
      user_id: request.user.id,
      uploadedFile: {
        fileName: request.file.filename,
        originalName: request.file.originalname,
        mimeType: request.file.mimetype,
      },
    });

    return response.status(201).json(file);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { file_id } = request.params;

    const updateFileService = container.resolve(UpdateFileService);

    const file = await updateFileService.execute({
      existing_file_id: file_id,
      uploadedFile: request.file,
      user_id: request.user.id,
    });

    return response.json(file);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { file_id } = request.params;

    const deleteFileService = container.resolve(DeleteFileService);

    await deleteFileService.execute({
      user_id: request.user.id,
      file_id,
    });

    return response.status(204).send();
  }
}

export default FilesController;
