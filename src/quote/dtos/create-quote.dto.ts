import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';
import { SenderType } from '../types';

export class CreateQuoteDto {
  @ApiProperty({
    description: 'The first name of the quote requester',
    example: 'John',
  })
  @IsNotEmpty()
  fName: string;

  @ApiProperty({
    description: 'The last name of the quote requester',
    example: 'Doe',
  })
  @IsNotEmpty()
  lName: string;

  @ApiProperty({
    description: 'The email address of the quote requester',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The phone number of the quote requester',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'The website URL of the quote requester',
    example: 'https://example.com',
  })
  @IsUrl()
  website: string;

  @ApiProperty({
    description: 'The address of the quote requester',
    example: '123 Main St',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The city of the quote requester',
    example: 'New York',
  })
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The state of the quote requester',
    example: 'NY',
  })
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'The country of the quote requester',
    example: 'USA',
  })
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'The source language for translation',
    example: 'English',
  })
  @IsNotEmpty()
  sourceLanguage: string;

  @ApiProperty({
    description: 'The target language for translation',
    example: 'Spanish',
  })
  @IsNotEmpty()
  targetLanguage: string;

  @ApiProperty({
    description: 'The type of translation required',
    example: 'Document Translation',
  })
  @IsNotEmpty()
  translationType: string;

  @ApiProperty({
    description: 'Additional message or notes from the quote requester',
    example: 'Please translate this document as soon as possible.',
  })
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'The type of quote request (personal or company)',
    example: 'personal',
    enum: ['personal', 'company'],
  })
  @IsNotEmpty()
  type: SenderType;

  @ApiProperty({
    description: 'The file to be translated',
    type: 'string',
    format: 'binary', // Indicates that this is a file upload field
  })
  @IsOptional() // File is optional in the DTO (Multer will handle it separately)
  file?: Express.Multer.File; // Use Multer's file type
}
