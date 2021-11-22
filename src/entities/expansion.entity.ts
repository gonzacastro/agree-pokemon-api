import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CardEntity } from './card.entity';

@Entity('expansion_pack')
export default class ExpansionPackEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CardEntity, (card) => card.id_expansion_pack)
  cards: CardEntity[];
}
