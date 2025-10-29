import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: 'localhost',
      port: 5434,
      database: 'pokemon-db',
      password: 'ad',
      username: 'ad',
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PokemonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
