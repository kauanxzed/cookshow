/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CookShow')
    .setDescription(
      'The CookShow API The CookShow offers a pleasant and intuitive user experience,                  ' +
        'providing a wide range of recipes for users, along with detailed information about ingredients, ' +
        'step-by-step instructions, nutrition facts, and suggestions for variations.                     ' +
        'It also allows users to save their favorite recipes, share them with friends and family.        '
    )
    .setVersion('1.0')
    .addTag('CookShow')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
