import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonService])],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
