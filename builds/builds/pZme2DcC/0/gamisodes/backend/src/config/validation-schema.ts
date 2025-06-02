import { plainToInstance, Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  validateSync,
} from 'class-validator';
import { ToInt } from 'src/shared/utils';

export enum APP_ENV {
  dev = 'development',
  prod = 'production',
}
export class ConfigSchema {
  @IsNumber()
  PORT: number;

  @IsString()
  HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  @IsOptional()
  FRONT_HOST: string;

  @IsString()
  ACCESS_TOKEN_SECRET_KEY: string;

  @IsString()
  REFRESH_TOKEN_SECRET_KEY: string;

  @IsString()
  TIME_OF_ACCESS_KEY: string;

  @IsString()
  TIME_OF_REFRESH_KEY: string;

  @IsUrl()
  PUBLIC_API_PATH: string;

  @IsString()
  PUBLIC_API_KEY: string;

  @IsString()
  CLIENT_SECRET: string;

  @IsString()
  PUBLIC_CLIENT_ID: string;

  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsUrl()
  GOOGLE_REDIRECT_URL: string;

  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({ each: true })
  GOOGLE_SCOPES: string[];

  @IsEmail()
  EMAIL: string;

  @IsString()
  EMAIL_AUTHOR_PASS: string;

  @IsString()
  MAGICLINK_REDIRECT_URL: string;

  @IsNumber()
  DEFAULT_NFT_PRICE: number = 25;

  @IsString()
  ADMIN_API_ACCESS_TOKEN: string;

  @IsString()
  SHOPIFY_WEBHOOK: string;

  @IsString()
  STORE_NAME: string;

  @IsString()
  PUBLIC_KLAVIYO_URL: string;

  @IsString()
  RECAPTCHA_TOKEN: string;

  @IsNumber()
  @ToInt()
  TIMEOUT_MILLISECONDS: number;

  @IsString()
  @Matches(/^0x[a-f0-9]{16}/)
  TRASH_WALLET: string;

  @IsString()
  AWS_REGION: string;

  @IsString()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  AWS_BUCKET_NAME: string;

  @IsString()
  AUTH0_ISSUER_URL: string;

  @IsString()
  AUTH0_AUDIENCE: string;

  @IsString()
  AUTH0_CLIENT_ID: string;

  @IsString()
  AUTH0_CLIENT_SECRET: string;

  @IsString()
  ADMIN_SECRET: string;

  @IsUrl()
  RARIBLE_HOST: string;

  @IsString()
  RARIBLE_API_KEY: string;

  @Transform(({ value }) => value.split(','))
  @IsString({ each: true })
  WRAPPERS_IDS: string[];

  @IsUrl()
  MAGIC_HOST: string;

  @IsString()
  MAGIC_API_KEY: string;

  @IsString()
  MAGIC_API_SECRET_KEY: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(ConfigSchema, config, {
    enableImplicitConversion: true,
    exposeDefaultValues: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
