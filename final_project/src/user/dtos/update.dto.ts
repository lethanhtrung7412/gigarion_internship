import { IsOptional } from 'class-validator';

export class UpdateUserProfileDtos {
  @IsOptional()
  email: string;
  @IsOptional()
  password: string;
  @IsOptional()
  firstName: string;
  @IsOptional()
  lastName: string;
}
