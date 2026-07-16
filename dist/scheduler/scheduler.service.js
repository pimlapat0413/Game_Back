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
let SchedulerService = SchedulerService_1 = class SchedulerService {
    wishlistService;
    gamesService;
    logger = new common_1.Logger(SchedulerService_1.name);
    constructor(wishlistService, gamesService) {
        this.wishlistService = wishlistService;
        this.gamesService = gamesService;
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
                await this.wishlistService.updatePrice(item.appid, newPrice, discountPercent);
                this.logger.log(`✅ Updated price for ${item.name}: ฿${newPrice}`);
            }
            catch (err) {
                this.logger.error(`Error checking price for appid ${item.appid}:`, err?.message);
            }
            await new Promise((r) => setTimeout(r, 500));
        }
        this.logger.log('✅ Price check complete');
    }
};
exports.SchedulerService = SchedulerService;
__decorate([
    (0, schedule_1.Cron)('0 */6 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "checkWishlistPrices", null);
exports.SchedulerService = SchedulerService = SchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService,
        games_service_1.GamesService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map