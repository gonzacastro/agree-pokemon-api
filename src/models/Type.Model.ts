import { ApiProperty } from '@nestjs/swagger';

export class TypeModel {
  @ApiProperty({ description: 'Type ID number' })
  id: number;

  @ApiProperty({ description: 'Type name' })
  name: string;
}
