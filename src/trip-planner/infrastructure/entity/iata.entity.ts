import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Iata {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column()
  code: string;
  @Column()
  latitude?: number;
  @Column()
  longitude?: number;
  @Column()
  name?: string;
}
