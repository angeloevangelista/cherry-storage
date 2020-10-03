import { AWSError } from 'aws-sdk';
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
  isAvatar?: boolean;
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
  ): Promise<PromiseResult<PutObjectOutput, AWSError>>;

  updateFile(
    params: IUpdateFileDTO,
  ): Promise<PromiseResult<PutObjectOutput, AWSError>>;

  deleteFile(
    params: IDeleteFileDTO,
  ): Promise<PromiseResult<CreateBucketOutput, AWSError>>;

  loadFile(
    params: ILoadFileDTO,
  ): Promise<PromiseResult<GetObjectOutput, AWSError>>;
}

export default IStorageProvider;
