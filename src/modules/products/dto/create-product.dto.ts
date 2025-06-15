import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  price: string;
}
