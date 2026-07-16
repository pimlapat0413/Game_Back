import { WishlistService } from '../wishlist/wishlist.service';
import { GamesService } from '../games/games.service';
export declare class SchedulerService {
    private readonly wishlistService;
    private readonly gamesService;
    private readonly logger;
    constructor(wishlistService: WishlistService, gamesService: GamesService);
    checkWishlistPrices(): Promise<void>;
}
