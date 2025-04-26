import { Injectable } from '@nestjs/common';
import { UrlDocument, UrlEntity } from '../../../core/entities/url.entity';
import { IUrlRepository } from '../interfaces/url-repository.interface';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UrlRepository implements IUrlRepository {
  constructor(
    @InjectModel(UrlEntity.name)
    private urlModel: Model<UrlDocument>,
  ) {}

  async create(url: Partial<UrlEntity>): Promise<UrlDocument> {
    const newUrl = new this.urlModel(url);
    return newUrl.save();
  }

  async findByShortCode(shortCode: string): Promise<UrlDocument | null> {
    return this.urlModel.findOne({ shortCode }).exec();
  }

  async findAllByUserId(userId: string): Promise<UrlDocument[]> {
    return this.urlModel.find({ userId }).exec();
  }

  async incrementVisitCount(id: string): Promise<void> {
    await this.urlModel.updateOne(
      { _id: id },
      { $inc: { visitCount: 1 } },
    ).exec();
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await this.urlModel.deleteOne({ _id: id, userId }).exec();
    return result.deletedCount > 0;
  }
}