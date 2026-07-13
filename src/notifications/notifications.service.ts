import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async findAll(): Promise<NotificationDocument[]> {
    return this.notificationModel.find().sort({ createdAt: -1 }).limit(50).exec();
  }

  async findUnread(): Promise<NotificationDocument[]> {
    return this.notificationModel.find({ isRead: false }).sort({ createdAt: -1 }).exec();
  }

  async countUnread(): Promise<number> {
    return this.notificationModel.countDocuments({ isRead: false }).exec();
  }

  async create(data: {
    appid: number;
    gameName: string;
    gameImage?: string;
    message: string;
    type: string;
    oldPrice?: number;
    newPrice?: number;
    discountPercent?: number;
  }): Promise<NotificationDocument> {
    const notif = new this.notificationModel(data);
    return notif.save();
  }

  async markAllRead(): Promise<void> {
    await this.notificationModel.updateMany({ isRead: false }, { isRead: true }).exec();
  }

  async markOneRead(id: string): Promise<void> {
    await this.notificationModel.findByIdAndUpdate(id, { isRead: true }).exec();
  }

  async deleteOne(id: string): Promise<void> {
    await this.notificationModel.findByIdAndDelete(id).exec();
  }

  async clearAll(): Promise<void> {
    await this.notificationModel.deleteMany({}).exec();
  }
}
