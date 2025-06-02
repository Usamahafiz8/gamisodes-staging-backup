import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin-token.guard';
import { DeleteFileParamDto } from './dto/delete-file.dto';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';

@AdminGuard()
@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @AdminGuard()
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: new RegExp(
              /(image\/jpeg|image\/jpg|video\/mp4|video\/webm)/g,
            ),
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const response = await this.filesService.uploadPublicFile({
      dataBuffer: file.buffer,
      filename: file.originalname,
      fileType: file.mimetype,
    });
    return response;
  }
  @Get('buckets')
  @AdminGuard()
  listBucketContent() {
    return this.filesService.listBucketContents();
  }

  @Delete(':id')
  @AdminGuard()
  remove(@Param() { id }: DeleteFileParamDto) {
    return this.filesService.deletePublicFile(id);
  }
}
