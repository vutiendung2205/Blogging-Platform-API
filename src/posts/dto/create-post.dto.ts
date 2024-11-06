import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsArray()
  tags: string[];
}
