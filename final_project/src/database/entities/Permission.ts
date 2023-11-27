import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './Role';

@Entity({ name: 'permissions' })
export default class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  code: string;

  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;
}
