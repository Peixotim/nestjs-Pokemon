import { IsNotEmpty, IsString } from 'class-validator';

export class PokemonRequestId {
  @IsString()
  @IsNotEmpty()
  id: string;
}
