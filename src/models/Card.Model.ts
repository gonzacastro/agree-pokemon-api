import { ApiProperty } from '@nestjs/swagger';

export class CardModel {
  @ApiProperty({ description: 'Card ID number' })
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ description: 'Pokemon name' })
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ description: 'Health points (10 multiple)' })
  @ApiProperty({ required: false })
  hp: number;

  @ApiProperty({ description: 'Is it first edition?' })
  @ApiProperty({ required: false })
  first_edition: boolean;

  @ApiProperty({ description: 'Name of its corresponding expansion pack' })
  @ApiProperty({ required: false })
  expansion_pack: string;

  @ApiProperty({ description: 'Its type' })
  @ApiProperty({ required: false })
  type: string;

  @ApiProperty({ description: 'Its rarity' })
  @ApiProperty({ required: false })
  rarity: string;

  @ApiProperty({ description: 'Market price (AR$)' })
  @ApiProperty({ required: false })
  price: number;

  @ApiProperty({ description: 'Official digital image link' })
  @ApiProperty({ required: false })
  image: string;

  @ApiProperty({ description: 'Creation date' })
  @ApiProperty({ required: false })
  created_date: Date;

  constructor(
    id: number,
    name: string,
    hp: number,
    first_edition: boolean,
    expansion_pack: string,
    type: string,
    rarity: string,
    price: number,
    image: string,
    created_date: Date,
  ) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.first_edition = first_edition;
    this.expansion_pack = expansion_pack;
    this.type = type;
    this.rarity = rarity;
    this.price = price;
    this.image = image;
    this.created_date = created_date;
  }
}
