import { Model } from 'mongoose';
import { WishlistDocument } from './wishlist.schema';
import { AddWishlistDto } from './wishlist.dto';
export declare class WishlistService {
    private wishlistModel;
    constructor(wishlistModel: Model<WishlistDocument>);
    findAll(): Promise<WishlistDocument[]>;
    findByAppid(appid: number): Promise<WishlistDocument | null>;
    add(dto: AddWishlistDto): Promise<WishlistDocument>;
    remove(appid: number): Promise<{
        deleted: boolean;
    }>;
    updatePrice(appid: number, currentPrice: number, discountPercent: number): Promise<void>;
    getWishlistAppids(): Promise<number[]>;
}
