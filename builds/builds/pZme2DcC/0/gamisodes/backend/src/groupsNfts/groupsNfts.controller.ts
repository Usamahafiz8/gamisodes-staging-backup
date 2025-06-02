import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Auth0Jwt } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin-token.guard';
import { GroupTypeEnum, User as IUser } from 'src/db/entity';
import { ApiBodyWithFile, User } from 'src/shared/utils';
import {
  CreateGroupDto,
  GetGroupDto,
  GetModelOfGroupId,
  OpenGroupDto,
  PaginationDto,
  UpdateFilesOfGroupDto,
  UpdateGroupModels,
} from './dto';
import { GroupsNFTService } from './groupsNfts.service';

@Controller('groups')
@ApiTags('Groups')
export class GroupsNFTController {
  constructor(private readonly groupService: GroupsNFTService) {}

  @Post()
  @AdminGuard()
  async createGroup(@Body() body: CreateGroupDto) {
    return await this.groupService.createAnyGroup(body);
  }

  @Put('/:groupId')
  @AdminGuard()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiBodyWithFile({ entity: CreateGroupDto, fileField: 'files' })
  async addGroupModels(
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new FileTypeValidator({ fileType: /(video\/webm|video\/mp4)/g }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Param() { groupId }: GetGroupDto,
    @Body() body: UpdateGroupModels,
  ) {
    return await this.groupService.addModelToGroup(groupId, body, files);
  }

  @Get()
  async getGroups(@Query() query: PaginationDto) {
    return await this.groupService.getGroupsList(query);
  }

  @Get('/:groupId')
  async getGroupById(@Param() { groupId }: GetGroupDto) {
    return await this.groupService.getGroup(groupId, { required: true });
  }

  @Patch('/:modelOfGroupId')
  @AdminGuard()
  async updateFilesOfGroup(
    @Param() { modelOfGroupId }: GetModelOfGroupId,
    @Body() body: UpdateFilesOfGroupDto,
  ) {
    return await this.groupService.updateFilesOfGroup(
      modelOfGroupId,
      body.filesIds,
    );
  }

  @Post('/buy-group/:groupId')
  @ApiExcludeEndpoint()
  @Auth0Jwt()
  async buyGroup(@Param() { groupId }: GetGroupDto, @User() { id }: IUser) {
    return await this.groupService.transferAnyGroup(groupId, id, true);
  }

  @Post('/open-group/:groupId/:niftoryId')
  @Auth0Jwt()
  async openGroup(
    @Param() { groupId, niftoryId }: OpenGroupDto,
    @User() { id: userId }: IUser,
  ) {
    const params = await this.groupService.validateGroup(
      groupId,
      niftoryId,
      userId,
    );
    if (
      params.group.type === GroupTypeEnum.Wrapper ||
      params.group.type === GroupTypeEnum.WrapperKeep
    )
      return await this.groupService.getWrapper(params, userId);
    if (params.group.type === GroupTypeEnum.Box)
      return await this.groupService.getBox(params, userId);
  }
}
