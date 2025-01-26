import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cities } from './cities.entity';
import { TripsInformation } from './trips-information.entity';

@Entity()
export class Trips {
  @PrimaryGeneratedColumn()
  id: string;
  @OneToOne(() => Cities)
  origin: Cities;
  @OneToOne(() => Cities)
  destination: Cities;
  @Column()
  cost: number;
  @Column()
  duration: number;
  @Column()
  type: string;
  @OneToOne(() => TripsInformation)
  information: TripsInformation;
}
