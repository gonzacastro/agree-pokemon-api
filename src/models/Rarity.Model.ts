import { ApiProperty } from '@nestjs/swagger';

export class RarityModel {
  @ApiProperty({ description: 'Rarity ID number' })
  id: number;

  @ApiProperty({ description: 'Rarity name' })
  name: string;
}
