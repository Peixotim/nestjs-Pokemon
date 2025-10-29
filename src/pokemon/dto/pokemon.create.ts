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
import { ApiProperty } from '@nestjs/swagger';

import { Region, PokemonType, Generation, Nature } from '../enums/pokemo.enums';

export class StatsDto {
  @ApiProperty({ description: 'Ataque físico do Pokémon', example: 50 })
  @IsNumber()
  attack: number;

  @ApiProperty({ description: 'Defesa física do Pokémon', example: 40 })
  @IsNumber()
  defense: number;

  @ApiProperty({ description: 'HP (vida) do Pokémon', example: 60 })
  @IsNumber()
  HP: number;

  @ApiProperty({ description: 'Ataque especial do Pokémon', example: 70 })
  @IsNumber()
  SpecialAttack: number;

  @ApiProperty({ description: 'Defesa especial do Pokémon', example: 50 })
  @IsNumber()
  SpecialDefense: number;

  @ApiProperty({ description: 'Velocidade do Pokémon', example: 90 })
  @IsNumber()
  Speed: number;
}

export class CreatePokemonDto {
  @ApiProperty({ description: 'Nome do Pokémon', example: 'Pikachu' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Número da Pokédex Nacional', example: 25 })
  @IsNumber()
  nationalDex: number;

  @ApiProperty({
    description: 'Região de origem do Pokémon',
    enum: Region,
    example: Region.KANTO,
  })
  @IsEnum(Region)
  region: Region;

  @ApiProperty({
    description: 'Tipos do Pokémon',
    enum: PokemonType,
    isArray: true,
    example: [PokemonType.ELECTRIC],
  })
  @IsArray()
  @IsEnum(PokemonType, { each: true })
  type: PokemonType[];

  @ApiProperty({
    description: 'Geração do Pokémon',
    enum: Generation,
    example: Generation.I,
  })
  @IsEnum(Generation)
  generation: Generation;

  @ApiProperty({
    description: 'Natureza do Pokémon',
    enum: Nature,
    example: Nature.ADAMANT,
  })
  @IsEnum(Nature)
  nature: Nature;

  @ApiProperty({ description: 'Altura do Pokémon em metros', example: 0.4 })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'Peso do Pokémon em kg', example: 6.0 })
  @IsNumber()
  weight: number;

  @ApiProperty({
    description: 'URL da imagem do Pokémon',
    example: 'https://img.pokemondb.net/artwork/pikachu.jpg',
  })
  @IsUrl()
  image: string;

  @ApiProperty({ description: 'Habilidades do Pokémon', example: 'Static' })
  @IsString()
  abilities: string;

  @ApiProperty({ description: 'Status base do Pokémon', type: StatsDto })
  @IsObject()
  @ValidateNested()
  @Type(() => StatsDto)
  stats: StatsDto;

  @ApiProperty({
    description: 'Total de EVs (Effort Values) do Pokémon',
    example: 85,
  })
  @IsNumber()
  ev: number;
}
