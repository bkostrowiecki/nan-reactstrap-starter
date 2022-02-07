import { NestFactory } from '@nestjs/core';
import express from 'express';
import path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    '/storybook',
    express.static(path.join(__dirname, '..', '..', 'storybook-static')),
  );

  await app.listen(3000);
}
bootstrap();
