import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  name: String;

  @IsString()
  password: String;
}
