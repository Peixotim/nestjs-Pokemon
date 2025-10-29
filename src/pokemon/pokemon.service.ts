import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonEntity } from './entity/pokemon.entity';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/pokemon.create';
import { PokemonSearchNameDto } from './dto/pokemon.searchName';

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
        console.error('Erro Detalhado:', {
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

  //Service de listagem de todos os pokemons
  public async findAll(): Promise<PokemonEntity[]> {
    try {
      const findAll: PokemonEntity[] = await this.pokemonRepository.find();
      if (findAll.length === 0) {
        throw new HttpException(
          `Error in our database there is no record of pokemon!`,
          HttpStatus.NOT_FOUND,
        );
      }
      return findAll;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro Detalhado:', {
          message: error.message,
          stack: error.stack,
        });
        throw new HttpException(
          `Failed to list Pokémon: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.error('Erro desconhecido:', error);
        throw new HttpException(
          'Failed to list Pokémon: unknown error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  //Busca um pokemon pelo nome
  public async findByName(dto: PokemonSearchNameDto): Promise<PokemonEntity> {
    try {
      const findByName = await this.pokemonRepository.findOneBy({
        name: dto.name,
      });

      if (!findByName) {
        throw new HttpException(
          `Pokémon with name "${dto.name}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return findByName;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('[PokemonService][findByName] Error:', {
          message: error.message,
          stack: error.stack,
        });
        throw new HttpException(
          `Failed to find Pokémon: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.error('[PokemonService][findByName] Unknown error:', error);
        throw new HttpException(
          'Failed to find Pokémon: unknown error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
