// src/team/dto/create-team.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    description: 'The name of the team member',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The position of the team member',
    example: 'Software Engineer',
  })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({
    description: 'The description of the team member',
    example: 'Experienced developer',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The location of the team member',
    example: 'New York, USA',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'The image of the team member',
    type: 'string',
    format: 'binary', // Indicates that this is a file upload field
  })
  image: any; // Use `any` or `Express.Multer.File` for Swagger compatibility
}
