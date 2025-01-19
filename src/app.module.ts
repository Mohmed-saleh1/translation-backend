import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './common/database/database.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ContactModule } from './contact/contact.module';
import { QuoteModule } from './quote/quote.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads directory
      serveRoot: '/uploads', // URL prefix for accessing static files
      serveStaticOptions: {
        index: false, // Disable directory indexing
        setHeaders: (res, path) => {
          // Set headers for PDF files to open in the browser
          if (path.endsWith('.pdf')) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename="file.pdf"');
          }
        },
      },
    }),
    DatabaseModule,
    ContactModule,
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
