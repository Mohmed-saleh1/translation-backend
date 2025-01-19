import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [QuoteController],
  providers: [QuoteService, FileUploadService],
})
export class QuoteModule {}
