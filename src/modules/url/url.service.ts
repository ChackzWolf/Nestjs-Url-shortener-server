import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUrlDto } from './dtos/create-url.dto';
import { UrlResponseDto } from './dtos/url-response.dto';
import { UrlRepository } from './repositories/url.repository';
import { Types } from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

@Injectable()
export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly configService: ConfigService,
  ) {}

  async createShortUrl(createUrlDto: CreateUrlDto, userId: string): Promise<UrlResponseDto> {
    const shortCode = this.generateShortCode();
    
    const url = await this.urlRepository.create({
      originalUrl: createUrlDto.originalUrl,
      shortCode,
      userId: new Types.ObjectId(userId),
    });

    const baseUrl = this.configService.get<string>('BASE_URL', 'http://localhost:3000');
    return new UrlResponseDto(url, baseUrl);
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    const url = await this.urlRepository.findByShortCode(shortCode);
    if (!url) {
      throw new NotFoundException('URL not found');
    }
    await this.urlRepository.incrementVisitCount(url._id as string);
    return url.originalUrl;
  }

  async getUserUrls(userId: string): Promise<UrlResponseDto[]> {
    const urls = await this.urlRepository.findAllByUserId(userId);
    const baseUrl = this.configService.get<string>('BASE_URL', 'http://localhost:3000');
    return urls.map(url => new UrlResponseDto(url, baseUrl));
  }

  async deleteUrl(id: string, userId: string): Promise<void> {
    const deleted = await this.urlRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundException('URL not found or you do not have permission to delete it');
    }
  }

  private generateShortCode(): string {
    // Create a short 6-character alphanumeric code
    return crypto
      .createHash('md5')
      .update(uuidv4())
      .digest('hex')
      .substring(0, 6);
  }
} 