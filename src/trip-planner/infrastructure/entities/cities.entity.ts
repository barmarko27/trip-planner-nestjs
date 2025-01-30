import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Iata } from './iata.entity';

@Entity()
export class Cities {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  shortDescription?: string;
  @OneToMany(() => Iata, (iata) => iata.city, { cascade: true })
  iataCodes: Iata[];
}
