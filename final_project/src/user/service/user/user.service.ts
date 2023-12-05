import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/entities/Role';
import User from 'src/database/entities/User';
import { RegisterDto } from 'src/user/dtos/register.dto';
import { UpdateUserProfileDtos } from 'src/user/dtos/update.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async register(payload: RegisterDto): Promise<User> {
    const role = await this.roleRepository.findOne({
      where: {
        code: payload.roleCode,
      },
    });
    console.log(role);
    const newUser = this.userRepository.create({
      ...payload,
      role: role,
    });
    console.log(newUser);
    return await this.userRepository.save(newUser);
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getUserByUserEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        role: {
          permissions: true,
        },
      },
    });
  }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUserProfile(
    id: string,
    payload: UpdateUserProfileDtos,
  ): Promise<UpdateResult> {
    const user = await this.userRepository.find({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const updateUser = await this.userRepository.update(id, {
      ...payload,
    });
    console.log(updateUser);
    return updateUser;
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    const deleteUser = await this.userRepository.delete(id);
    return deleteUser;
  }
}
