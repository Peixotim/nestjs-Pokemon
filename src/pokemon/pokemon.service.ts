import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonEntity } from './entity/pokemon.entity';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/pokemon.create';
import { PokemonRequestName } from './dto/pokemon.requestName';
import { PokemonRequestId } from './dto/pokemon.requestId';
import { PokemonRequestNationalDex } from './dto/pokemon.requestNationalDex';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: Repository<PokemonEntity>,
  ) {}

  // Service de criação do pokemon
  public async createPokemon(
    request: CreatePokemonDto,
  ): Promise<PokemonEntity> {
    if (!request) {
      throw new HttpException(
        'Failed to create Pokémon: request is null',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const newPokemon = this.pokemonRepository.create(request);
      const saved = await this.pokemonRepository.save(newPokemon);
      return saved;
    } catch (error: unknown) {
      console.error(
        '[PokemonService][createPokemon] Error:',
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : error,
      );

      throw new HttpException(
        `Failed to create Pokémon: ${error instanceof Error ? error.message : 'unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Service de listagem de todos os pokemons
  public async findAll(): Promise<PokemonEntity[]> {
    try {
      const allPokemons = await this.pokemonRepository.find();
      if (allPokemons.length === 0) {
        throw new HttpException(
          'Failed to list Pokémon: no records found',
          HttpStatus.NOT_FOUND,
        );
      }
      return allPokemons;
    } catch (error: unknown) {
      console.error(
        '[PokemonService][findAll] Error:',
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : error,
      );

      throw new HttpException(
        `Failed to list Pokémon: ${error instanceof Error ? error.message : 'unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Busca um pokemon pelo nome
  public async findByName(dto: PokemonRequestName): Promise<PokemonEntity> {
    try {
      const pokemon = await this.pokemonRepository.findOneBy({
        name: dto.name,
      });
      if (!pokemon) {
        throw new HttpException(
          `Failed to find Pokémon: Pokémon with name "${dto.name}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return pokemon;
    } catch (error: unknown) {
      console.error(
        '[PokemonService][findByName] Error:',
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : error,
      );

      throw new HttpException(
        `Failed to find Pokémon: ${error instanceof Error ? error.message : 'unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Deleta um pokemon pelo nome
  public async delete(request: PokemonRequestName): Promise<PokemonEntity> {
    try {
      const pokemon = await this.pokemonRepository.findOneBy({
        name: request.name,
      });
      if (!pokemon) {
        throw new HttpException(
          `Failed to delete Pokémon: Pokémon with name "${request.name}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      await this.pokemonRepository.delete(request.name);
      return pokemon;
    } catch (error: unknown) {
      console.error(
        '[PokemonService][delete] Error:',
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : error,
      );

      throw new HttpException(
        `Failed to delete Pokémon: ${error instanceof Error ? error.message : 'unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Modifica a nationalDex do pokemon
  public async modifyNationalDex(
    request: PokemonRequestId,
    requestNationalDex: PokemonRequestNationalDex,
  ): Promise<PokemonEntity> {
    try {
      const findPokemon = await this.pokemonRepository.findOneBy({
        id: request.id,
      });

      if (!findPokemon) {
        throw new HttpException(
          `Failed to modify Pokémon national Dex: Pokémon with id "${request.id}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      findPokemon.nationaldex = requestNationalDex.nationalDex;

      const saved = await this.pokemonRepository.save(findPokemon);
      return saved;
    } catch (error: unknown) {
      console.error(
        '[PokemonService][modifyNationalDex] Error:',
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : error,
      );

      throw new HttpException(
        `Failed to modify Pokémon national Dex: ${error instanceof Error ? error.message : 'unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
