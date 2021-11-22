import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from 'src/controllers/card.controller';
import { CardEntity } from 'src/entities/card.entity';
import { CardService } from 'src/services/card.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardsModule {}
