import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CardEntity } from './card.entity';

@Entity('rarity')
export default class RarityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CardEntity, (card) => card.id_rarity)
  cards: CardEntity[];
}
