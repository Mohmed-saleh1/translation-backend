import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { UpdateQuoteDto } from './dtos/update-quote.dto';
import { QuoteResponseDto } from './dtos/quote-response.dto';
import { SenderType } from './types';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  // Create a new quote
  async createQuote(
    data: CreateQuoteDto,
    folderName: string,
    file?: Express.Multer.File,
  ): Promise<Quote> {
    let filePath = '';
    if (file) {
      filePath = await this.fileUploadService.uploadFile(file, folderName);
    }

    const quote = this.quoteRepository.create({
      ...data,
      file: filePath,
    });

    return this.quoteRepository.save(quote);
  }

  // Find all quotes
  async findAll(): Promise<QuoteResponseDto[]> {
    const quotes = await this.quoteRepository.find();
    return quotes.map((quote) => this.mapToResponseDto(quote));
  }

  // Find a quote by ID
  async findOne(id: string): Promise<QuoteResponseDto> {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    return this.mapToResponseDto(quote);
  }

  // Update a quote by ID
  // async update(
  //   id: string,
  //   updateQuoteDto: UpdateQuoteDto,
  // ): Promise<QuoteResponseDto> {
  //   const quote = await this.quoteRepository.preload({
  //     id,
  //     ...updateQuoteDto,
  //   });
  //   if (!quote) {
  //     throw new NotFoundException(`Quote with ID ${id} not found`);
  //   }
  //   const updatedQuote = await this.quoteRepository.save(quote);
  //   return this.mapToResponseDto(updatedQuote);
  // }

  // Delete a quote by ID
  async remove(id: string): Promise<void> {
    const result = await this.quoteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
  }

  async opendedQuotes(): Promise<QuoteResponseDto[]> {
    const quotes = await this.quoteRepository.find({
      where: {
        type: SenderType.PERSONAL,
        isOpened: true,
      },
    });
    return quotes;
  }

  async unopendedQuotes(): Promise<QuoteResponseDto[]> {
    const quotes = await this.quoteRepository.find({
      where: {
        type: SenderType.PERSONAL,
        isOpened: false,
      },
    });
    return quotes;
  }

  async bussinesQuotes(): Promise<QuoteResponseDto[]> {
    const quotes = await this.quoteRepository.find({
      where: {
        type: SenderType.BUSINESS,
      },
    });
    return quotes;
  }

  // Map Quote entity to QuoteResponseDto
  private mapToResponseDto(quote: Quote): QuoteResponseDto {
    const responseDto = new QuoteResponseDto();
    Object.assign(responseDto, quote);
    return responseDto;
  }
}
