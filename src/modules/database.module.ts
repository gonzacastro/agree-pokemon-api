import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/entities/card.entity';
import ExpansionPackEntity from 'src/entities/expansion.entity';
import RarityEntity from 'src/entities/rarity.entity';
import TypeEntity from 'src/entities/type.entity';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'b97t3cxnuashjhlrxnvj-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uyled2kaw8pj5uxy',
      password: 'aqugu89oufCo42GQv64d',
      database: 'b97t3cxnuashjhlrxnvj',
      entities: [CardEntity, TypeEntity, RarityEntity, ExpansionPackEntity],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {
  constructor(private readonly connection: Connection) {}
}
