import { UrlEntity } from '../../../core/entities/url.entity';

export interface IUrlRepository {
  create(url: Partial<UrlEntity>): Promise<UrlEntity>;
  findByShortCode(shortCode: string): Promise<UrlEntity | null>;
  findAllByUserId(userId: string): Promise<UrlEntity[]>;
  incrementVisitCount(id: string): Promise<void>;
  delete(id: string, userId: string): Promise<boolean>;
}