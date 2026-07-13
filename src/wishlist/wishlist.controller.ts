import {
  Controller, Get, Post, Delete, Patch, Param, Body, ParseIntPipe,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddWishlistDto, UpdateTargetPriceDto } from './wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get(':appid')
  findOne(@Param('appid', ParseIntPipe) appid: number) {
    return this.wishlistService.findByAppid(appid);
  }

  @Post()
  add(@Body() dto: AddWishlistDto) {
    return this.wishlistService.add(dto);
  }

  @Delete(':appid')
  remove(@Param('appid', ParseIntPipe) appid: number) {
    return this.wishlistService.remove(appid);
  }

  @Patch(':appid/target-price')
  updateTargetPrice(
    @Param('appid', ParseIntPipe) appid: number,
    @Body() dto: UpdateTargetPriceDto,
  ) {
    return this.wishlistService.updateTargetPrice(appid, dto);
  }
}
