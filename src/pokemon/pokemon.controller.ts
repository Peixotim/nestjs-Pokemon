import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PokemonEntity } from './entity/pokemon.entity';
import { CreatePokemonDto } from './dto/pokemon.create';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createPokemon(
    @Body() request: CreatePokemonDto,
  ): Promise<PokemonEntity> {
    return this.pokemonService.createPokemon(request);
  }
}
