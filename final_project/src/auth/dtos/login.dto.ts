import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDtos {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
