import { ApiProperty } from '@nestjs/swagger';
import {
  IsDivisibleBy,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CardDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public hp: number;

  @ApiProperty()
  public first_edition: boolean;

  @ApiProperty()
  public id_expansion_pack: number;

  @ApiProperty()
  public id_type: number;

  @ApiProperty()
  public id_rarity: number;

  @ApiProperty()
  public price: number;

  @ApiProperty()
  public image: string;
}

export class InsertCardDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDivisibleBy(10)
  readonly hp: number;

  @IsString()
  @IsNotEmpty()
  readonly first_edition: boolean;

  @IsNumber()
  @IsNotEmpty()
  readonly id_expansion_pack: number;

  @IsNumber()
  @IsNotEmpty()
  readonly id_type: number;

  @IsNumber()
  @IsNotEmpty()
  readonly id_rarity: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateCardDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @IsDivisibleBy(10)
  readonly hp: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly first_edition: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly id_expansion_pack: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly id_type: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly id_rarity: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly price: number;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  readonly image: string;
}

export class FilterCardDto {
  @ApiProperty({ required: false, description: 'Filters by the given ID' })
  @IsString()
  @IsOptional()
  readonly id: string;

  @ApiProperty({ required: false, description: 'Filters by the given name' })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({ required: false, description: 'Filters by the given ID' })
  @IsString()
  @IsOptional()
  readonly hp: number;

  @ApiProperty({ required: false, description: 'Filters by the given ID' })
  @IsString()
  @IsOptional()
  readonly first_edition: boolean;

  @ApiProperty({ required: false, description: 'Filters by the given ID' })
  @IsString()
  @IsOptional()
  readonly id_expansion_pack: number;

  @ApiProperty({ required: false, description: 'Filters by the given ID' })
  @IsString()
  @IsOptional()
  readonly id_type: number;

  @ApiProperty({ required: false, description: 'Filters by the given ID' })
  @IsString()
  @IsOptional()
  readonly id_rarity: number;

  @ApiProperty({ required: false, description: 'Filters by the given ID' })
  @IsString()
  @IsOptional()
  readonly price: number;

  @ApiProperty({ required: false, description: 'Filters by the given ID' })
  @IsString()
  @IsOptional()
  readonly image: string;
}
