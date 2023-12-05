import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './Role';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

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

  @ManyToOne(() => Role, (role) => role.code)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
