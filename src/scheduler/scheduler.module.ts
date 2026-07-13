import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { WishlistModule } from '../wishlist/wishlist.module';
import { GamesModule } from '../games/games.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [WishlistModule, GamesModule, NotificationsModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
