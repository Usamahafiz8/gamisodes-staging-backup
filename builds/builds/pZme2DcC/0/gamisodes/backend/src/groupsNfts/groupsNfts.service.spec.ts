import { Test, TestingModule } from '@nestjs/testing';
import { GroupsNFTService } from './groupsNfts.service';

describe('PacksService', () => {
  let service: GroupsNFTService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsNFTService],
    }).compile();

    service = module.get<GroupsNFTService>(GroupsNFTService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
