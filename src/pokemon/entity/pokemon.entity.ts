import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Region, PokemonType, Generation, Nature } from '../enums/pokemo.enums';

@Entity('pokemons')
export class PokemonEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'int' })
  nationaldex: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: Region })
  region: Region;

  @Column({ type: 'enum', enum: PokemonType, array: true })
  type: PokemonType[];

  @Column({ type: 'enum', enum: Generation })
  generation: Generation;

  @Column({ type: 'enum', enum: Nature })
  nature: Nature;

  @Column({ type: 'float' })
  height: number;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  abilities: string;

  @Column('json')
  stats: {
    attack: number;
    defense: number;
    HP: number;
    SpecialAttack: number;
    SpecialDefense: number;
    Speed: number;
  };

  @Column({ type: 'int' })
  ev: number;

  constructor(
    name: string,
    nationaldex: number,
    region: Region,
    type: PokemonType[],
    generation: Generation,
    nature: Nature,
    height: number,
    weight: number,
    image: string,
    abilities: string,
    stats: {
      attack: number;
      defense: number;
      HP: number;
      SpecialAttack: number;
      SpecialDefense: number;
      Speed: number;
    },
    ev: number,
  ) {
    this.nationaldex = nationaldex;
    this.name = name;
    this.region = region;
    this.type = type;
    this.generation = generation;
    this.nature = nature;
    this.height = height;
    this.weight = weight;
    this.image = image;
    this.abilities = abilities;
    this.stats = stats;
    this.ev = ev;
  }
}
