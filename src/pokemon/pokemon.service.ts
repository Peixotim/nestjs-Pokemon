import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonEntity } from './entity/pokemon.entity';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/pokemon.create';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: Repository<PokemonEntity>,
  ) {}

  //Service de criação do pokemon
  public async createPokemon(
    request: CreatePokemonDto,
  ): Promise<PokemonEntity> {
    if (!request) {
      throw new HttpException('Error: request is null', HttpStatus.BAD_REQUEST);
    }
    try {
      const newPokemon = this.pokemonRepository.create(request);
      const saved = await this.pokemonRepository.save(newPokemon);
      return saved;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Detail error:', {
          message: error.message,
          stack: error.stack,
        });

        throw new HttpException(
          `Failed to create Pokémon: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.error('Erro desconhecido:', error);
        throw new HttpException(
          'Failed to create Pokémon: unknown error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
