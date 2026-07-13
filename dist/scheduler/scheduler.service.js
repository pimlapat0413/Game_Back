"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const wishlist_service_1 = require("../wishlist/wishlist.service");
const games_service_1 = require("../games/games.service");
const notifications_service_1 = require("../notifications/notifications.service");
let SchedulerService = SchedulerService_1 = class SchedulerService {
    wishlistService;
    gamesService;
    notificationsService;
    logger = new common_1.Logger(SchedulerService_1.name);
    constructor(wishlistService, gamesService, notificationsService) {
        this.wishlistService = wishlistService;
        this.gamesService = gamesService;
        this.notificationsService = notificationsService;
    }
    async checkWishlistPrices() {
        this.logger.log('🔍 Checking wishlist prices...');
        const wishlistItems = await this.wishlistService.findAll();
        if (!wishlistItems.length)
            return;
        for (const item of wishlistItems) {
            try {
                const priceInfo = await this.gamesService.getCurrentPrice(item.appid);
                if (!priceInfo)
                    continue;
                const { price: newPrice, discountPercent } = priceInfo;
                const oldPrice = item.currentPrice;
                await this.wishlistService.updatePrice(item.appid, newPrice, discountPercent);
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
            }
            catch (err) {
                this.logger.error(`Error checking price for appid ${item.appid}:`, err?.message);
            }
            await new Promise((r) => setTimeout(r, 500));
        }
        await this.checkSeasonalSale();
        this.logger.log('✅ Price check complete');
    }
    async checkSeasonalSale() {
        const { isSale, saleName } = this.gamesService.isSteamSale();
        if (!isSale || !saleName)
            return;
        const wishlistItems = await this.wishlistService.findAll();
        if (!wishlistItems.length)
            return;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existing = await this.notificationsService.findAll();
        const alreadyNotified = existing.some((n) => n.type === 'seasonal_sale' &&
            new Date(n['createdAt']).getTime() >= today.getTime());
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
};
exports.SchedulerService = SchedulerService;
__decorate([
    (0, schedule_1.Cron)('0 */6 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "checkWishlistPrices", null);
__decorate([
    (0, schedule_1.Cron)('0 9 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "checkSeasonalSale", null);
exports.SchedulerService = SchedulerService = SchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService,
        games_service_1.GamesService,
        notifications_service_1.NotificationsService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map