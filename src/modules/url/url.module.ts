import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlEntity, UrlSchema } from '../../core/entities/url.entity';
import { UrlRepository } from './repositories/url.repository';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UrlEntity.name, schema: UrlSchema }]),
  ],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
})
export class UrlModule {}
