import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Permission from './Permission';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  code: string;

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];
}
