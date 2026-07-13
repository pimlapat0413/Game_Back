import { WishlistService } from '../wishlist/wishlist.service';
import { GamesService } from '../games/games.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class SchedulerService {
    private readonly wishlistService;
    private readonly gamesService;
    private readonly notificationsService;
    private readonly logger;
    constructor(wishlistService: WishlistService, gamesService: GamesService, notificationsService: NotificationsService);
    checkWishlistPrices(): Promise<void>;
    checkSeasonalSale(): Promise<void>;
}
