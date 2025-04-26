import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UrlResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  originalUrl: string;

  @Expose()
  @ApiProperty()
  shortCode: string;

  @Expose()
  @ApiProperty()
  shortUrl: string;

  @Expose()
  @ApiProperty()
  visitCount: number;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  constructor(partial: Partial<UrlResponseDto>, baseUrl: string) {
    Object.assign(this, partial);
    if (partial.shortCode) {
      this.shortUrl = `${baseUrl}/url/${partial.shortCode}`;
    }
  }
}