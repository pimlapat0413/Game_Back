import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WishlistService } from '../wishlist/wishlist.service';
import { GamesService } from '../games/games.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly wishlistService: WishlistService,
    private readonly gamesService: GamesService,
  ) {}

  // Check price every 6 hours
  @Cron('0 */6 * * *')
  async checkWishlistPrices() {
    this.logger.log('🔍 Checking wishlist prices...');

    const wishlistItems = await this.wishlistService.findAll();
    if (!wishlistItems.length) return;

    for (const item of wishlistItems) {
      try {
        const priceInfo = await this.gamesService.getCurrentPrice(item.appid);
        if (!priceInfo) continue;

        const { price: newPrice, discountPercent } = priceInfo;

        // Update price in DB
        await this.wishlistService.updatePrice(item.appid, newPrice, discountPercent);
        this.logger.log(`✅ Updated price for ${item.name}: ฿${newPrice}`);
      } catch (err) {
        this.logger.error(`Error checking price for appid ${item.appid}:`, err?.message);
      }

      // Small delay to not spam Steam API
      await new Promise((r) => setTimeout(r, 500));
    }

    this.logger.log('✅ Price check complete');
  }
}

