import { Injectable } from '@nestjs/common';
import { NiftoryApiService } from './niftory-api/niftory-api.service';

@Injectable()
export class AppService {
  constructor(private readonly nService: NiftoryApiService) {}

  async getHello(): Promise<any> {
    return await this.nService.getModels();
  }
}
