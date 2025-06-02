import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { GetConfigService } from 'src/config/config.service';
import { File } from 'src/db/entity';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

interface IPublicFile {
  dataBuffer: Buffer;
  filename: string;
  fileType: string;
}

@Injectable()
export class FilesService {
  constructor(
    @InjectAwsService(S3) private readonly s3: S3,
    @InjectRepository(File)
    private publicFilesRepository: Repository<File>,
    private readonly configService: GetConfigService,
  ) { }

  async uploadPublicFile(publicFile: IPublicFile): Promise<File> {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.safeGet('AWS_BUCKET_NAME'),
        Body: publicFile.dataBuffer,
        Key: `${uuid()}-${publicFile.filename}`,
        ACL: 'public-read',
      })
      .promise();
    if (!uploadResult) {
      throw new Error('Failed to load file');
    }
    const newFile = this.publicFilesRepository.create({
      fileType: publicFile.fileType,
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    const saveFile = (
      await this.publicFilesRepository
        .createQueryBuilder()
        .insert()
        .values(newFile)
        .returning('*')
        .execute()
    )?.raw?.[0];
    if (!saveFile) {
      throw new Error('Failed to save file');
    }
    return saveFile;
  }

  async uploadManyPublicFiles(files: Express.Multer.File[]) {
    const savedFiles: File[] = [];
    for (const { buffer, originalname, mimetype } of files) {
      const file = await this.uploadPublicFile({
        dataBuffer: buffer,
        filename: originalname,
        fileType: mimetype,
      });
      savedFiles.push(file);
    }
    return savedFiles;
  }

  async listBucketContents() {
    const response = await this.s3
      .listObjectsV2({ Bucket: this.configService.safeGet('AWS_BUCKET_NAME') })
      .promise();
    return response.Contents.map((c) => c.Key);
  }

  async deletePublicFile(fileId: string) {
    const file = await this.publicFilesRepository.findOne({
      where: { id: fileId },
    });
    if (!file) {
      return null;
    }
    await this.s3
      .deleteObject({
        Bucket: this.configService.safeGet('AWS_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();
    await this.publicFilesRepository.delete(fileId);
  }

  async getFiles(filesIds: string[]) {
    return await this.publicFilesRepository.find({
      where: { id: In(filesIds) },
    });
  }
}
