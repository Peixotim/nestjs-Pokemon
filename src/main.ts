import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove chaves que nao estao no DTO
      forbidNonWhitelisted: true, //Retorna oque aconteceu
    }),
  );
  await app.listen(process.env.PORT ?? 9999);
}
bootstrap();
