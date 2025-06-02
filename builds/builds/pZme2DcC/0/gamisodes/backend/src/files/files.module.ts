import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/db/entity';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { S3 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';

@Module({
  imports: [TypeOrmModule.forFeature([File]), AwsSdkModule.forFeatures([S3])],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
