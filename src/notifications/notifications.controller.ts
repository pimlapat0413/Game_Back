import { Controller, Get, Patch, Delete, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get('unread/count')
  countUnread() {
    return this.notificationsService.countUnread().then((count) => ({ count }));
  }

  @Patch('read-all')
  markAllRead() {
    return this.notificationsService.markAllRead().then(() => ({ success: true }));
  }

  @Patch(':id/read')
  markOneRead(@Param('id') id: string) {
    return this.notificationsService.markOneRead(id).then(() => ({ success: true }));
  }

  @Delete('clear-all')
  clearAll() {
    return this.notificationsService.clearAll().then(() => ({ success: true }));
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.notificationsService.deleteOne(id).then(() => ({ success: true }));
  }
}
