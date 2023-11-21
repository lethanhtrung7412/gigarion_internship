import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/User';
import { RegisterDto } from 'src/user/dtos/Register.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerBody: RegisterDto): Promise<User> {
    const newUser = this.userRepository.create({ ...registerBody });
    return await this.userRepository.save(newUser);
  }

  async getInfo(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }
}
