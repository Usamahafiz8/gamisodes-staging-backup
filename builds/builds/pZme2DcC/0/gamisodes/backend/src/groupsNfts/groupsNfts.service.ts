import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import {
  GroupTypeEnum,
  GroupsOfNfts,
  ModelOfGroup,
  NFTs,
  PendingGroups,
} from 'src/db/entity';
import { FilesService } from 'src/files/files.service';
import { ModelsService } from 'src/models/models.service';
import { NftService } from 'src/nft/nft.service';
import { ErrorsEnum } from 'src/shared/types';
import { postponedPromise } from 'src/shared/utils';
import { In, Repository } from 'typeorm';
import { PaginationDto, UpdateGroupModels } from './dto';

export interface GroupFindData {
  group: GroupsOfNfts;
  groupNft: NFTs;
}

export interface GroupCreateData {
  type: GroupTypeEnum;
  cardFaceModelId: string;
  anotherVersionId?: string;
  unpackagingDate?: Date;
}

export interface FindGroupOptions {
  required?: boolean;
  errorMessage?: string;
}

@Injectable()
export class GroupsNFTService implements OnModuleInit {
  @InjectRepository(GroupsOfNfts)
  private readonly groupRepo: Repository<GroupsOfNfts>;
  @InjectRepository(ModelOfGroup)
  private readonly modelOfGroupRepo: Repository<ModelOfGroup>;
  @InjectRepository(PendingGroups)
  private readonly pendingGroupsRepo: Repository<PendingGroups>;

  constructor(
    private readonly nftService: NftService,
    private readonly modelService: ModelsService,
    private readonly fileService: FilesService,
  ) { }

  onModuleInit() {
    this.timeout();
  }

  async timeout(sec: number = 3000) {
    try {
      await postponedPromise(async () => {
        const groups = await this.pendingGroupsRepo.find({ take: 500 });
        if (!groups?.length) return;
        const fulfilledGroups = await this.nftService.notFulfillmentsNfts(
          groups.map(({ groupId }) => groupId),
          true,
        );
        await this.nftService.saveNftToDB(
          fulfilledGroups.map(({ id: niftoryId, serialNumber, modelId }) => ({
            niftoryId,
            serialNumber,
            modelId,
          })),
        );
        await this.pendingGroupsRepo.delete({
          groupId: In(fulfilledGroups.map(({ id }) => id)),
        });
      }, sec);
    } catch (err) {
      console.log(err);
    }
    await this.timeout(sec);
  }

  async createAnyGroup({
    type,
    cardFaceModelId,
    anotherVersionId,
    unpackagingDate,
  }: GroupCreateData) {
    const wrapperKeep = type === GroupTypeEnum.WrapperKeep;
    if (wrapperKeep) await this.getGroup(anotherVersionId, { required: true });
    // Check if exist model of group and face card model
    const cardFaceModel = await this.modelService.getModel(cardFaceModelId, {
      required: true,
    });
    const groupCreate = this.groupRepo.create({
      type,
      cardFaceModelId,
      anotherVersionId,
      unpackagingDate,
    });
    const group = (
      await this.groupRepo
        .createQueryBuilder()
        .insert()
        .values(groupCreate)
        .returning('*')
        .execute()
    )?.raw?.[0] as GroupsOfNfts;
    if (wrapperKeep)
      await this.groupRepo.save({
        id: anotherVersionId,
        anotherVersionId: group.id,
      });
    await this.modelService.addGroupMetadata(cardFaceModel.niftoryId, group);
    return group;
  }

  async addModelToGroup(
    groupId: string,
    { modelId, packagingModelId }: UpdateGroupModels,
    files: Express.Multer.File[],
  ) {
    await this.modelService.getModel(modelId, { required: true });
    if (packagingModelId)
      await this.modelService.getModel(packagingModelId, { required: true });
    const savedFiles = await this.fileService.uploadManyPublicFiles(files);
    const model = (
      await this.modelOfGroupRepo
        .createQueryBuilder()
        .insert()
        .values({
          groupId,
          modelId,
          packagingModelId,
        })
        .returning('*')
        .execute()
    )?.raw[0] as ModelOfGroup;
    await this.modelOfGroupRepo.save({
      files: savedFiles,
      id: model.id,
    });
  }

  async updateFilesOfGroup(modelOfGroupId: string, filesIds: string[]) {
    const isGroupExist = await this.modelOfGroupRepo.exist({
      where: { id: modelOfGroupId },
    });
    if (!isGroupExist) {
      throw new BadRequestException(ErrorsEnum.GroupNotExist);
    }
    const newFiles = await this.fileService.getFiles(filesIds);
    if (newFiles.length !== filesIds.length) {
      throw new BadRequestException(ErrorsEnum.FileNotExist);
    }
    return await this.modelOfGroupRepo.save({
      files: newFiles,
      id: modelOfGroupId,
    });
  }

  async getGroup(
    groupId: string,
    { required, errorMessage }: FindGroupOptions = {},
  ) {
    const group = await this.groupRepo.findOne({
      where: { id: groupId },
      relations: { cardFaceModel: true, models: true, files: true },
    });
    if (!group && required)
      throw new BadRequestException(errorMessage || ErrorsEnum.GroupNotExist);
    return group;
  }

  async getGroupsList({ skip, take }: PaginationDto) {
    const [data, count] = await this.groupRepo.findAndCount({
      take,
      skip,
      relations: { cardFaceModel: true },
    });
    return { data, count };
  }

  async transferMAnyGroups(groupId: string, userId: string, quantity: number) {
    const nftIds: string[] = [];
    for (let i = 0; i < quantity; i++)
      nftIds.push(await this.transferAnyGroup(String(groupId), userId));
    return nftIds;
  }

  async transferAnyGroup(groupId: string, userId: string, required?: boolean) {
    const {
      cardFaceModel: { niftoryId: modelId },
      anotherVersion,
    } = await this.groupRepo.findOne({
      where: { id: groupId },
      relations: {
        cardFaceModel: true,
        anotherVersion: { cardFaceModel: true },
      },
    });
    if (!modelId) {
      if (required) throw new BadRequestException(ErrorsEnum.GroupNotExist);
      console.log('\x1b[31mModel of group not exist\x1b[0m');
      return;
    }

    const { niftoryId, id } = await this.nftService.findAndTransferNft(
      modelId,
      userId,
      true,
    );
    if (anotherVersion)
      await this.nftService.findAndTransferNft(
        anotherVersion?.cardFaceModel.niftoryId,
      );
    await this.pendingGroupsRepo.save(
      this.pendingGroupsRepo.create({ groupId: niftoryId, userId, nftId: id }),
    );
    return niftoryId;
  }

  async validateGroup(
    groupId: string,
    niftoryId: string,
    userId: string,
  ): Promise<GroupFindData> {
    // TODO: create validators
    const group = await this.groupRepo.findOne({
      where: { id: groupId },
      relations: {
        models: { model: true, packagingModel: true, files: true },
        cardFaceModel: true,
        anotherVersion: true,
      },
    });
    if (!group || !group?.models?.[0])
      throw new BadRequestException(ErrorsEnum.ErrorModelOfGroupNotExist);
    if (moment(group.unpackagingDate).isAfter(new Date()))
      throw new BadRequestException(ErrorsEnum.GroupNotAvailable);
    // TODO: create validators
    const groupNft = await this.nftService.findNftFromDB({
      niftoryId,
      modelId: group?.cardFaceModel.niftoryId,
      userId,
    });
    if (!groupNft)
      throw new BadRequestException(ErrorsEnum.YouNotHaveThisGroup);
    return { group, groupNft };
  }

  async getWrapper(
    { group, groupNft: wrapper }: GroupFindData,
    userId: string,
  ) {
    const keepWrapper = group.type === GroupTypeEnum.WrapperKeep;
    const modelsIds = group.models?.map(({ model }) => model?.niftoryId);
    const nft = await this.nftService.getRandomNfts(modelsIds);
    await this.nftService.transferNftToUser(nft.niftoryId, userId);
    await this.nftService.transferToTrash(wrapper.niftoryId, userId);
    const pack = await this.keepWrapper(
      group.models.find(({ model }) => model?.niftoryId === nft.modelId),
      nft.serialNumber,
      keepWrapper ? userId : undefined,
    );
    // Need for front flow
    const model = await this.modelService.getModel({ niftoryId: nft.modelId });
    const { title: packTitle } = await this.modelService.getModel({
      niftoryId: pack.modelId,
    });
    const packaging = keepWrapper && { ...pack, title: packTitle };
    const files = group.models.find(
      ({ model: { niftoryId } }) => niftoryId === nft.modelId,
    ).files;
    return {
      ...nft,
      files,
      title: model.title,
      rarity: model.m_rarity,
      packaging,
    };
  }

  async keepWrapper(
    { packagingModel: { niftoryId } }: ModelOfGroup,
    serialNumber: number,
    userId?: string,
  ) {
    const wrapperNft = await this.nftService.findNftFromDB({
      modelId: niftoryId,
      serialNumber,
    });
    if (userId)
      await this.nftService.transferNftToUser(wrapperNft.niftoryId, userId);
    else await this.nftService.transferToTrash(wrapperNft.niftoryId);
    return wrapperNft;
  }

  async getBox({ group, groupNft: box }: GroupFindData, userId: string) {
    const modelId = group.models[0]?.model.niftoryId;
    const nft = await this.nftService.findNftFromDB({ modelId });
    await this.nftService.transferNftToUser(nft.niftoryId, userId);
    await this.nftService.transferToTrash(box.niftoryId, userId);
    return nft;
  }
}
