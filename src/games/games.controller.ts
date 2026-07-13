import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('featured')
  getFeatured() {
    return this.gamesService.getFeatured();
  }

  @Get('categories')
  getCategories() {
    return this.gamesService.getFeaturedCategories();
  }

  @Get('sale-status')
  getSaleStatus() {
    return this.gamesService.isSteamSale();
  }

  @Get('search')
  search(@Query('q') q: string) {
    if (!q || q.trim().length < 2) return [];
    return this.gamesService.search(q.trim());
  }

  @Get(':appid')
  getDetail(@Param('appid', ParseIntPipe) appid: number) {
    return this.gamesService.getAppDetail(appid);
  }
}
