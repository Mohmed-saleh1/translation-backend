// src/services/file-upload.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  async uploadFile(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<string> {
    const uploadDir = path.join('uploads', folderName);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    // Normalize the file path for URLs
    const normalizedFilePath = filePath.replace(/\\/g, '/');

    // Return the full URL to the file
    return `${process.env.DOMAIN_URI}/uploads/${folderName}/${fileName}`;
  }

  async deleteFile(filePath: string): Promise<void> {
    // Normalize the file path for the file system
    const normalizedFilePath = filePath.replace(/\//g, path.sep);

    if (fs.existsSync(normalizedFilePath)) {
      fs.unlinkSync(normalizedFilePath);
    }
  }
}
