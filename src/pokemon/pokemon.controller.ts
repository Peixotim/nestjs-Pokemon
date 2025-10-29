import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PokemonEntity } from './entity/pokemon.entity';
import { CreatePokemonDto } from './dto/pokemon.create';
import { PokemonService } from './pokemon.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PokemonRequestNationalDex } from './dto/pokemon.requestNationalDex';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @ApiCreatedResponse({
    description: 'Pokémon criado com sucesso',
    type: PokemonEntity,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createPokemon(
    @Body() request: CreatePokemonDto,
  ): Promise<PokemonEntity> {
    return this.pokemonService.createPokemon(request);
  }

  @ApiOkResponse({
    description: 'Lista de todos os Pokémons',
    type: [PokemonEntity],
  })
  @ApiNotFoundResponse({ description: 'Nenhum Pokémon encontrado' })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<PokemonEntity[]> {
    return this.pokemonService.findAll();
  }

  @ApiOkResponse({
    description: 'Pokémon encontrado pelo nome',
    type: PokemonEntity,
  })
  @ApiNotFoundResponse({ description: 'Pokémon não encontrado' })
  @Get(':name')
  @HttpCode(HttpStatus.OK)
  public async findByName(@Param('name') name: string): Promise<PokemonEntity> {
    return this.pokemonService.findByName({ name });
  }

  @ApiOkResponse({
    description: 'National Dex do Pokémon atualizado',
    type: PokemonEntity,
  })
  @ApiNotFoundResponse({ description: 'Pokémon não encontrado' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async modifyNationalDex(
    @Param('id') id: string,
    @Body() requestNationalDex: PokemonRequestNationalDex,
  ): Promise<PokemonEntity> {
    return this.pokemonService.modifyNationalDex({ id }, requestNationalDex);
  }

  @ApiOkResponse({
    description: 'Pokémon deletado com sucesso',
    type: PokemonEntity,
  })
  @ApiNotFoundResponse({ description: 'Pokémon não encontrado' })
  @Delete(':name')
  @HttpCode(HttpStatus.OK)
  public async delete(@Param('name') name: string): Promise<PokemonEntity> {
    return this.pokemonService.delete({ name });
  }
}
