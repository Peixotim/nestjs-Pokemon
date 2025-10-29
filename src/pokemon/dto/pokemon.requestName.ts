import { IsNotEmpty, IsString } from 'class-validator';

export class PokemonRequestName {
  @IsString()
  @IsNotEmpty()
  name: string;
}
