import { Test, TestingModule } from '@nestjs/testing';
import { GetConfigService } from './config.service';

describe('ConfigService', () => {
  let service: GetConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetConfigService],
    }).compile();

    service = module.get<GetConfigService>(GetConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
