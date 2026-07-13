import { Model } from 'mongoose';
import { NotificationDocument } from './notification.schema';
export declare class NotificationsService {
    private notificationModel;
    constructor(notificationModel: Model<NotificationDocument>);
    findAll(): Promise<NotificationDocument[]>;
    findUnread(): Promise<NotificationDocument[]>;
    countUnread(): Promise<number>;
    create(data: {
        appid: number;
        gameName: string;
        gameImage?: string;
        message: string;
        type: string;
        oldPrice?: number;
        newPrice?: number;
        discountPercent?: number;
    }): Promise<NotificationDocument>;
    markAllRead(): Promise<void>;
    markOneRead(id: string): Promise<void>;
    deleteOne(id: string): Promise<void>;
    clearAll(): Promise<void>;
}
