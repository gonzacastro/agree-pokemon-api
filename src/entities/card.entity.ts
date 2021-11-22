import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ExpansionPackEntity from './expansion.entity';
import RarityEntity from './rarity.entity';
import TypeEntity from './type.entity';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hp: number;

  @Column()
  first_edition: boolean;

  @Column()
  id_expansion_pack: number;
  @ManyToOne(() => ExpansionPackEntity, (expansion) => expansion.cards)
  @JoinColumn({ name: 'id_expansion_pack' })
  expansion_pack: Promise<ExpansionPackEntity>;

  @Column()
  id_type: number;
  @ManyToOne(() => TypeEntity, (type) => type.cards)
  @JoinColumn({ name: 'id_type' })
  type: Promise<TypeEntity>;

  @Column()
  id_rarity: number;
  @ManyToOne(() => RarityEntity, (rarity) => rarity.cards)
  @JoinColumn({ name: 'id_rarity' })
  rarity: Promise<RarityEntity>;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  created_date: Date;
}
