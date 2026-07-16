import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WishlistItem, WishlistDocument } from './wishlist.schema';
import { AddWishlistDto } from './wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(WishlistItem.name)
    private wishlistModel: Model<WishlistDocument>,
  ) {}

  async findAll(): Promise<WishlistDocument[]> {
    return this.wishlistModel.find().sort({ createdAt: -1 }).exec();
  }

  async findByAppid(appid: number): Promise<WishlistDocument | null> {
    return this.wishlistModel.findOne({ appid }).exec();
  }

  async add(dto: AddWishlistDto): Promise<WishlistDocument> {
    const existing = await this.findByAppid(dto.appid);
    if (existing) {
      throw new ConflictException(`Game appid ${dto.appid} already in wishlist`);
    }
    const item = new this.wishlistModel(dto);
    return item.save();
  }

  async remove(appid: number): Promise<{ deleted: boolean }> {
    const result = await this.wishlistModel.deleteOne({ appid }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Game appid ${appid} not found in wishlist`);
    }
    return { deleted: true };
  }

  async updatePrice(appid: number, currentPrice: number, discountPercent: number): Promise<void> {
    await this.wishlistModel
      .findOneAndUpdate({ appid }, { currentPrice, discountPercent })
      .exec();
  }

  async getWishlistAppids(): Promise<number[]> {
    const items = await this.wishlistModel.find({}, { appid: 1 }).exec();
    return items.map((i) => i.appid);
  }
}

