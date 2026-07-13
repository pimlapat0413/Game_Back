import { WishlistService } from './wishlist.service';
import { AddWishlistDto, UpdateTargetPriceDto } from './wishlist.dto';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    findAll(): Promise<import("./wishlist.schema").WishlistDocument[]>;
    findOne(appid: number): Promise<import("./wishlist.schema").WishlistDocument | null>;
    add(dto: AddWishlistDto): Promise<import("./wishlist.schema").WishlistDocument>;
    remove(appid: number): Promise<{
        deleted: boolean;
    }>;
    updateTargetPrice(appid: number, dto: UpdateTargetPriceDto): Promise<import("./wishlist.schema").WishlistDocument>;
}
