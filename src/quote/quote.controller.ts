import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { UpdateQuoteDto } from './dtos/update-quote.dto';
import { QuoteResponseDto } from './dtos/quote-response.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { Quote } from './quote.entity';

@ApiTags('quotes')
@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  // Create a new quote
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async createQuote(
    @Body() data: CreateQuoteDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const folderName = 'quotes';
    return this.quoteService.createQuote(data, folderName, file);
  }

  // Get all quotes
  @Get()
  async findAll(): Promise<QuoteResponseDto[]> {
    return this.quoteService.findAll();
  }

  // Get personal quotes
  @Get('opened')
  async personalQuotes(): Promise<QuoteResponseDto[]> {
    return this.quoteService.opendedQuotes();
  }

  @Get('unOpened')
  async unOpendedPersonalQuotes(): Promise<QuoteResponseDto[]> {
    return this.quoteService.unopendedQuotes();
  }

  // Get a quote by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<QuoteResponseDto> {
    return this.quoteService.findOne(id);
  }

  // Update a quote by ID
  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateQuoteDto: UpdateQuoteDto,
  // ): Promise<QuoteResponseDto> {
  //   return this.quoteService.update(id, updateQuoteDto);
  // }

  // Delete a quote by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.quoteService.remove(id);
  }
}
