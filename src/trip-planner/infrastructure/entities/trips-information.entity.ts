import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TripsInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  shortDescription: string;
  @Column({ nullable: true })
  lang: string;
}
