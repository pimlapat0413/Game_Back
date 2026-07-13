export declare class GamesService {
    private cache;
    private CACHE_TTL;
    private cachedGet;
    getFeatured(): Promise<{
        appid: any;
        name: any;
        headerImage: any;
        currentPrice: number;
        originalPrice: number;
        discountPercent: any;
        isFree: boolean;
    }[]>;
    getFeaturedCategories(): Promise<any>;
    search(query: string): Promise<any>;
    getAppDetail(appid: number): Promise<{
        appid: any;
        name: any;
        headerImage: any;
        shortDescription: any;
        detailedDescription: any;
        genres: any;
        categories: any;
        developer: any;
        publisher: any;
        releaseDate: any;
        currentPrice: number;
        originalPrice: number;
        discountPercent: any;
        isFree: any;
        currency: any;
        screenshots: any;
        movies: any;
        metacritic: any;
        recommendations: any;
        tags: string[];
    }>;
    getCurrentPrice(appid: number): Promise<{
        price: number;
        discountPercent: number;
    } | null>;
    private mapFeaturedItem;
    isSteamSale(): {
        isSale: boolean;
        saleName: string | null;
    };
}
