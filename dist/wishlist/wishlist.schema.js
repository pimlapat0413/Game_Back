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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistItemSchema = exports.WishlistItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let WishlistItem = class WishlistItem {
    appid;
    name;
    headerImage;
    currentPrice;
    originalPrice;
    discountPercent;
    genres;
    developer;
    shortDescription;
    currency;
};
exports.WishlistItem = WishlistItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], WishlistItem.prototype, "appid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], WishlistItem.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WishlistItem.prototype, "headerImage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], WishlistItem.prototype, "currentPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], WishlistItem.prototype, "originalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], WishlistItem.prototype, "discountPercent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], WishlistItem.prototype, "genres", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WishlistItem.prototype, "developer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WishlistItem.prototype, "shortDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'THB' }),
    __metadata("design:type", String)
], WishlistItem.prototype, "currency", void 0);
exports.WishlistItem = WishlistItem = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], WishlistItem);
exports.WishlistItemSchema = mongoose_1.SchemaFactory.createForClass(WishlistItem);
//# sourceMappingURL=wishlist.schema.js.map