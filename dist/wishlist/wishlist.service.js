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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wishlist_schema_1 = require("./wishlist.schema");
let WishlistService = class WishlistService {
    wishlistModel;
    constructor(wishlistModel) {
        this.wishlistModel = wishlistModel;
    }
    async findAll() {
        return this.wishlistModel.find().sort({ createdAt: -1 }).exec();
    }
    async findByAppid(appid) {
        return this.wishlistModel.findOne({ appid }).exec();
    }
    async add(dto) {
        const existing = await this.findByAppid(dto.appid);
        if (existing) {
            throw new common_1.ConflictException(`Game appid ${dto.appid} already in wishlist`);
        }
        const item = new this.wishlistModel(dto);
        return item.save();
    }
    async remove(appid) {
        const result = await this.wishlistModel.deleteOne({ appid }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Game appid ${appid} not found in wishlist`);
        }
        return { deleted: true };
    }
    async updateTargetPrice(appid, dto) {
        const item = await this.wishlistModel
            .findOneAndUpdate({ appid }, { targetPrice: dto.targetPrice }, { new: true })
            .exec();
        if (!item)
            throw new common_1.NotFoundException(`Game appid ${appid} not found`);
        return item;
    }
    async updatePrice(appid, currentPrice, discountPercent) {
        await this.wishlistModel
            .findOneAndUpdate({ appid }, { currentPrice, discountPercent })
            .exec();
    }
    async getWishlistAppids() {
        const items = await this.wishlistModel.find({}, { appid: 1 }).exec();
        return items.map((i) => i.appid);
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wishlist_schema_1.WishlistItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map