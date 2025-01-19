// src/team/dto/update-team.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @ApiProperty({
    description: 'The name of the team member',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The position of the team member',
    example: 'Software Engineer',
    required: false,
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({
    description: 'The description of the team member',
    example: 'Experienced developer',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The location of the team member',
    example: 'New York, USA',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'The image of the team member',
    type: 'string',
    format: 'binary', // Indicates that this is a file upload field
    required: false,
  })
  @IsOptional()
  image?: any; // Use `any` or `Express.Multer.File` for Swagger compatibility
}
