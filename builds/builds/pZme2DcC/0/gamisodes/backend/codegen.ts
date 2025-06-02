import { GetConfigService } from "./src/config/config.service"
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configClass = new GetConfigService(new ConfigService())

const settings = {
  overwrite: true,
  schema: {
    [configClass.safeGet('PUBLIC_API_PATH')]: {
      headers: {
        "X-Niftory-API-Key": configClass.safeGet('PUBLIC_API_KEY'),
        "X-Niftory-Client-Secret": configClass.safeGet('CLIENT_SECRET'),
      },
    },
  },
  documents: ["./src/niftory-api/**/*.(graphql)"],
  generates: {
    "src/niftory-api/graphql.ts": {
      presetConfig: {
        typesPath: "./schemas",
      },
      plugins: ["typescript", "typescript-operations", "typescript-generic-sdk"],
    },
  },
}

export default settings