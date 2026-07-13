import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  appid: number;

  @Prop({ required: true })
  gameName: string;

  @Prop()
  gameImage: string;

  @Prop({ required: true })
  message: string;

  @Prop({
    type: String,
    enum: ['price_drop', 'seasonal_sale', 'wishlist_sale', 'target_reached'],
    default: 'price_drop',
  })
  type: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop()
  oldPrice: number;

  @Prop()
  newPrice: number;

  @Prop()
  discountPercent: number;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
