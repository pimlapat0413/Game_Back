import { Model } from 'mongoose';
import { WishlistDocument } from './wishlist.schema';
import { AddWishlistDto, UpdateTargetPriceDto } from './wishlist.dto';
export declare class WishlistService {
    private wishlistModel;
    constructor(wishlistModel: Model<WishlistDocument>);
    findAll(): Promise<WishlistDocument[]>;
    findByAppid(appid: number): Promise<WishlistDocument | null>;
    add(dto: AddWishlistDto): Promise<WishlistDocument>;
    remove(appid: number): Promise<{
        deleted: boolean;
    }>;
    updateTargetPrice(appid: number, dto: UpdateTargetPriceDto): Promise<WishlistDocument>;
    updatePrice(appid: number, currentPrice: number, discountPercent: number): Promise<void>;
    getWishlistAppids(): Promise<number[]>;
}
