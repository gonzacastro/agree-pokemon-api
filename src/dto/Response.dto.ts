import { ApiProperty } from '@nestjs/swagger';
import { CardModel } from 'src/models/Card.Model';

export class SuccessResponseDto {
  statusCode: number;

  message: string;

  @ApiProperty({ required: false, type: [CardModel] })
  data: CardModel[] | CardModel;

  constructor(
    statusCode: number,
    message: string,
    data?: CardModel[] | CardModel,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
