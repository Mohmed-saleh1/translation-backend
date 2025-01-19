import { ApiProperty } from '@nestjs/swagger';
import { SenderType } from '../types';

export class QuoteResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the quote',
    example: '12345',
  })
  id: string;

  @ApiProperty({
    description: 'The first name of the quote requester',
    example: 'John',
  })
  fName: string;

  @ApiProperty({
    description: 'The last name of the quote requester',
    example: 'Doe',
  })
  lName: string;

  @ApiProperty({
    description: 'The email address of the quote requester',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the quote requester',
    example: '+1234567890',
  })
  phone: string;

  @ApiProperty({
    description: 'The website URL of the quote requester',
    example: 'https://example.com',
  })
  website: string;

  @ApiProperty({
    description: 'The address of the quote requester',
    example: '123 Main St',
  })
  address: string;

  @ApiProperty({
    description: 'The city of the quote requester',
    example: 'New York',
  })
  city: string;

  @ApiProperty({
    description: 'The state of the quote requester',
    example: 'NY',
  })
  state: string;

  @ApiProperty({
    description: 'The country of the quote requester',
    example: 'USA',
  })
  country: string;

  @ApiProperty({
    description: 'The source language for translation',
    example: 'English',
  })
  sourceLanguage: string;

  @ApiProperty({
    description: 'The target language for translation',
    example: 'Spanish',
  })
  targetLanguage: string;

  @ApiProperty({
    description: 'The type of translation required',
    example: 'Document Translation',
  })
  translationType: string;

  @ApiProperty({
    description: 'The file to be translated (file path or URL)',
    example: 'https://example.com/document.pdf',
  })
  file: string;

  @ApiProperty({
    description: 'Additional message or notes from the quote requester',
    example: 'Please translate this document as soon as possible.',
  })
  message: string;

  @ApiProperty({
    description: 'The type of quote request (personal or company)',
    example: 'personal',
    enum: SenderType,
  })
  type: SenderType;

  @ApiProperty({
    description: 'is quote is opended',
    example: true,
  })
  isOpened: boolean;

  @ApiProperty({
    description: 'The date when the quote was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the quote was last updated',
    example: '2023-01-02T00:00:00.000Z',
  })
  updatedAt: Date;
}
