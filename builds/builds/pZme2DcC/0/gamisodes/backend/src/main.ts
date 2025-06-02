import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { GetConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(GetConfigService);
  const PORT = configService.safeGet('PORT');

  app.enableCors({
    origin: '*',
  });

  app.use(cookieParser());

  app.set('trust proxy', 1);
  app.setGlobalPrefix('/server');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { strategy: 'excludeAll' },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Gamisodes')
    .setDescription('Documentation for Gamisodes project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('server/doc', app, document);

  await app.listen(PORT, () => {
    Logger.log(`Server start on \x1b[33m${PORT}\x1b[32m port`);
  });
}
bootstrap();
