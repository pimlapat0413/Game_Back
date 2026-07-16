import {
  Controller, Get, Post, Delete, Param, Body, ParseIntPipe,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddWishlistDto } from './wishlist.dto';

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
}

