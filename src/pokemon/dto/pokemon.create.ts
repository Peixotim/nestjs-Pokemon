import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Region, PokemonType, Generation, Nature } from '../enums/pokemo.enums';

class StatsDto {
  @IsNumber()
  attack: number;

  @IsNumber()
  defense: number;

  @IsNumber()
  HP: number;

  @IsNumber()
  SpecialAttack: number;

  @IsNumber()
  SpecialDefense: number;

  @IsNumber()
  Speed: number;
}

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  nationalDex: number;

  @IsEnum(Region)
  region: Region;

  @IsArray()
  @IsEnum(PokemonType, { each: true })
  type: PokemonType[];

  @IsEnum(Generation)
  generation: Generation;

  @IsEnum(Nature)
  nature: Nature;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsUrl()
  image: string;

  @IsString()
  abilities: string;

  @IsObject()
  @ValidateNested()
  @Type(() => StatsDto)
  stats: StatsDto;

  @IsNumber()
  ev: number;
}
