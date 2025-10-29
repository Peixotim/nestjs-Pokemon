import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove chaves que nao estao no DTO
      forbidNonWhitelisted: true, //Retorna oque aconteceu
    }),
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('PokéVerse API')
    .setDescription(
      `
       A **PokéVerse API** é uma plataforma completa e escalável desenvolvida com **NestJS + TypeORM + PostgreSQL**, 
    projetada para o **gerenciamento avançado de Pokémons** e suas interações.

    🔹 Crie, liste, edite e exclua Pokémons com validação robusta.  
    🔹 Estrutura modular e preparada para expansão (treinadores, batalhas, regiões, etc.).  
    🔹 Integração com banco de dados relacional e documentação automatizada via Swagger.  

    Ideal para projetos de estudo, simulações ou sistemas complexos inspirados no universo Pokémon.`,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
