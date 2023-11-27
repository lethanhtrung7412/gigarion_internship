import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './Role';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @OneToOne(() => Role, (role) => role.code)
  @JoinColumn({ name: 'role_code' })
  role: Role;
}
