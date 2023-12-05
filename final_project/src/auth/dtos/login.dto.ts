import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDtos {
  @ApiProperty({
    example: 'email@example.com',
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    nullable: false,
  })
  @IsNotEmpty()
  password: string;
}
