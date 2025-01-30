import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cities } from './cities.entity';

@Entity()
export class Iata {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column()
  code: string;
  @Column({ nullable: true })
  latitude?: number;
  @Column({ nullable: true })
  longitude?: number;
  @Column({ nullable: true })
  name?: string;
  @ManyToOne(() => Cities, (city) => city.iataCodes)
  city?: Cities;
}
