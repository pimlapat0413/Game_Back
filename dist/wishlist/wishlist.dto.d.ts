export declare class AddWishlistDto {
    appid: number;
    name: string;
    headerImage?: string;
    currentPrice?: number;
    originalPrice?: number;
    discountPercent?: number;
    genres?: string[];
    developer?: string;
    shortDescription?: string;
    targetPrice?: number;
}
export declare class UpdateTargetPriceDto {
    targetPrice: number | null;
}
