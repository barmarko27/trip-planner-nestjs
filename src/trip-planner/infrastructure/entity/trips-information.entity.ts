import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TripsInformation {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  shortDescription: string;
  @Column()
  lang: string;
}
