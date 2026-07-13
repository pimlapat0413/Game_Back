import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(): Promise<import("./notification.schema").NotificationDocument[]>;
    countUnread(): Promise<{
        count: number;
    }>;
    markAllRead(): Promise<{
        success: boolean;
    }>;
    markOneRead(id: string): Promise<{
        success: boolean;
    }>;
    clearAll(): Promise<{
        success: boolean;
    }>;
    deleteOne(id: string): Promise<{
        success: boolean;
    }>;
}
