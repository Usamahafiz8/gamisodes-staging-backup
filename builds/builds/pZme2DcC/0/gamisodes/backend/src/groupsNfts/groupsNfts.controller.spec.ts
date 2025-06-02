import { Test, TestingModule } from '@nestjs/testing';
import { GroupsNFTController } from './groupsNfts.controller';

describe('PacksController', () => {
  let controller: GroupsNFTController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsNFTController],
    }).compile();

    controller = module.get<GroupsNFTController>(GroupsNFTController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
