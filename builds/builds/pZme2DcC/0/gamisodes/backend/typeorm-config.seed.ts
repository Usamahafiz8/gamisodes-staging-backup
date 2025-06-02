import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

config();

const configService = new ConfigService();

const folder = './src/db/seed/';
const normalizedPath = path.join(__dirname, folder);
const migrations = fs.existsSync(normalizedPath)
  ? fs.readdirSync(normalizedPath).reduce((accum, file: string) => {
      if (file === 'index.ts') return accum;
      const exports = require(path.join(__dirname, folder, file));
      return [...accum, ...Object.values(exports)];
    }, [])
  : [];

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  migrations,
  entities: [],
});
