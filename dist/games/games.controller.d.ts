import { GamesService } from './games.service';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    getFeatured(): Promise<{
        appid: any;
        name: any;
        headerImage: any;
        currentPrice: number;
        originalPrice: number;
        discountPercent: any;
        isFree: boolean;
    }[]>;
    getCategories(): Promise<any>;
    getSaleStatus(): {
        isSale: boolean;
        saleName: string | null;
    };
    search(q: string): Promise<any> | never[];
    getDetail(appid: number): Promise<{
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
}
