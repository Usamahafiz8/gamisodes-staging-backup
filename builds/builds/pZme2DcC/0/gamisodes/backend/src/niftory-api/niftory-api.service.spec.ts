import { Test, TestingModule } from '@nestjs/testing';
import { NiftoryApiService } from './niftory-api.service';

describe('NiftoryApiService', () => {
  let service: NiftoryApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NiftoryApiService],
    }).compile();

    service = module.get<NiftoryApiService>(NiftoryApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
