import { IsNotEmpty, IsString } from 'class-validator';

export class PokemonSearchNameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
