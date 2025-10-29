import { IsNotEmpty, IsNumber } from 'class-validator';

export class PokemonRequestNationalDex {
  @IsNumber()
  @IsNotEmpty()
  nationalDex: number;
}
