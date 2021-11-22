import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Database Models')
export class ExpansionPackModel {
  @ApiProperty({ description: 'Expansion Pack ID number' })
  id: number;

  @ApiProperty({ description: 'Expansion Pack name' })
  name: string;
}
