import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsOfNfts, ModelNFTs } from 'src/db/entity';
import { NiftoryApiService } from 'src/niftory-api/niftory-api.service';
import { ErrorsEnum } from 'src/shared/types';
import { FindOptionsWhere, In, Repository } from 'typeorm';

export interface FindModelOptions {
  required?: boolean;
  errorMessage?: string;
}

@Injectable()
export class ModelsService {
  @InjectRepository(ModelNFTs)
  private readonly modelsRepo: Repository<ModelNFTs>;

  constructor(private readonly nService: NiftoryApiService) {}

  async addGroupMetadata(modelId: string, group: GroupsOfNfts) {
    const {
      nftModel: { metadata },
    } = await this.nService.model(modelId);
    metadata.groupId = group.id;
    metadata.groupType = group.type;
    const { updateNFTModel } = await this.nService.updateModelMetadata(
      modelId,
      metadata,
    );
    return updateNFTModel;
  }

  async getModels(
    filterOrId: string[],
    { required, errorMessage }: FindModelOptions = {},
  ) {
    const models = await this.modelsRepo.findBy({ id: In(filterOrId) });
    if (models.length !== filterOrId.length && required)
      throw new BadRequestException(
        errorMessage || ErrorsEnum.ErrorModelOfGroupNotExist,
      );
    return models;
  }

  async getModel(
    filterOrId: string | FindOptionsWhere<ModelNFTs>,
    { required, errorMessage }: FindModelOptions = {},
  ) {
    if (typeof filterOrId === 'string') filterOrId = { id: filterOrId };

    const model = await this.modelsRepo.findOneBy(filterOrId);
    if (!model && required)
      throw new BadRequestException(
        errorMessage || ErrorsEnum.ErrorModelOfGroupNotExist,
      );
    return model;
  }
}
