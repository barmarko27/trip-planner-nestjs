import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Iata } from './iata.entity';

@Entity()
export class Cities {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  shortDescription: string;
  @OneToMany((type) => Iata, (iata) => iata.code)
  iataCodes: Iata[] = [];
}
