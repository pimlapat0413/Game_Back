import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { WishlistModule } from '../wishlist/wishlist.module';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [WishlistModule, GamesModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}

