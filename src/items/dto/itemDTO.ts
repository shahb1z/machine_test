import { IsString, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;  // Optional field
}
