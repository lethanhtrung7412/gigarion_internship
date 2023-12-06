import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Role } from './Role';

@Entity({ name: 'permissions' })
export default class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  code: string;

  @ManyToMany(() => Role, (role) => role.permissions, {
    cascade: true,
  })
  roles: Role[];
}
