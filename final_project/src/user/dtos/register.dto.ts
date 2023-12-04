import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsEnum(Role, {
    message: 'Must be a valid role',
  })
  roleCode: string;
}
