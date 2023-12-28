import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('data')
export class Data {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
