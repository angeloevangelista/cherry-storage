import {
  CreateBucketOutput,
  GetObjectOutput,
  PutObjectOutput,
} from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';

export interface ISaveFileDTO {
  s3Path: string;
  fileName: string;
  mimeType: string;
}

export interface IUpdateFileDTO {
  s3Path: string;
  fileName: string;
  mimeType: string;
}

export interface IDeleteFileDTO {
  s3Path: string;
  fileName: string;
}

export interface ILoadFileDTO {
  s3Path: string;
  fileName: string;
}

export interface IStorageProvider {
  saveFile(
    params: ISaveFileDTO,
  ): Promise<PromiseResult<PutObjectOutput, Error>>;

  updateFile(
    params: IUpdateFileDTO,
  ): Promise<PromiseResult<PutObjectOutput, Error>>;

  deleteFile(
    params: IDeleteFileDTO,
  ): Promise<PromiseResult<CreateBucketOutput, Error>>;

  loadFile(
    params: ILoadFileDTO,
  ): Promise<PromiseResult<GetObjectOutput, Error>>;
}

export default IStorageProvider;
