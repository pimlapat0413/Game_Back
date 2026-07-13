import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WishlistService } from '../wishlist/wishlist.service';
import { GamesService } from '../games/games.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly wishlistService: WishlistService,
    private readonly gamesService: GamesService,
    private readonly notificationsService: NotificationsService,
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
        const oldPrice = item.currentPrice;

        // Update price in DB
        await this.wishlistService.updatePrice(item.appid, newPrice, discountPercent);

        // Check if price dropped significantly (>= 20% off or target reached)
        const dropped = oldPrice > 0 && newPrice < oldPrice;
        const bigDrop = discountPercent >= 20;
        const targetReached = item.targetPrice !== null && newPrice <= item.targetPrice;

        if (dropped && bigDrop) {
          await this.notificationsService.create({
            appid: item.appid,
            gameName: item.name,
            gameImage: item.headerImage,
            message: `💸 ${item.name} ลดราคา ${discountPercent}%! จาก ฿${oldPrice.toFixed(0)} เหลือ ฿${newPrice.toFixed(0)}`,
            type: 'price_drop',
            oldPrice,
            newPrice,
            discountPercent,
          });
          this.logger.log(`✅ Price drop notification created for ${item.name}`);
        }

        if (targetReached) {
          await this.notificationsService.create({
            appid: item.appid,
            gameName: item.name,
            gameImage: item.headerImage,
            message: `🎯 ${item.name} ถึงราคาเป้าหมายแล้ว! ราคาตอนนี้ ฿${newPrice.toFixed(0)} (เป้า ฿${item.targetPrice?.toFixed(0)})`,
            type: 'target_reached',
            oldPrice,
            newPrice,
            discountPercent,
          });
        }
      } catch (err) {
        this.logger.error(`Error checking price for appid ${item.appid}:`, err?.message);
      }

      // Small delay to not spam Steam API
      await new Promise((r) => setTimeout(r, 500));
    }

    // Check if seasonal sale is active
    await this.checkSeasonalSale();
    this.logger.log('✅ Price check complete');
  }

  // Check seasonal sale daily at 9am
  @Cron('0 9 * * *')
  async checkSeasonalSale() {
    const { isSale, saleName } = this.gamesService.isSteamSale();
    if (!isSale || !saleName) return;

    const wishlistItems = await this.wishlistService.findAll();
    if (!wishlistItems.length) return;

    // Create one notification per sale period (check if already notified today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await this.notificationsService.findAll();
    const alreadyNotified = existing.some(
      (n) =>
        n.type === 'seasonal_sale' &&
        new Date(n['createdAt']).getTime() >= today.getTime(),
    );

    if (!alreadyNotified) {
      await this.notificationsService.create({
        appid: 0,
        gameName: saleName,
        message: `🎉 ${saleName} กำลังดำเนินอยู่! เกมในวิชลิสต์ของคุณอาจมีการลดราคา`,
        type: 'seasonal_sale',
        discountPercent: 0,
      });
    }
  }
}
