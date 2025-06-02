import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from './validation-schema';

@Module({})
export class GetConfigService {
  constructor(private readonly nestConfigService: ConfigService) {}
  safeGet<K extends keyof ConfigSchema>(key: K): ConfigSchema[K] {
    const value = this.nestConfigService.get<ConfigSchema[K]>(key);

    if (value === undefined || value === null) {
      throw new Error(`${key} is not set`);
    }

    return value;
  }
}
