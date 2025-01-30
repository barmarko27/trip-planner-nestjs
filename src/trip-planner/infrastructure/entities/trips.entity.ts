import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from './cities.entity';
import { TripsInformation } from './trips-information.entity';

@Entity()
export class Trips {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => Cities, { cascade: true })
  @JoinColumn()
  origin: Cities;
  @OneToOne(() => Cities, { cascade: true })
  @JoinColumn()
  destination: Cities;
  @Column()
  cost: number;
  @Column()
  duration: number;
  @Column()
  type: string;
  @OneToOne(() => TripsInformation, { cascade: true })
  @JoinColumn()
  information: TripsInformation;
}
