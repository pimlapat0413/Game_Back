import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WishlistDocument = WishlistItem & Document;

@Schema({ timestamps: true })
export class WishlistItem {
  @Prop({ required: true, unique: true })
  appid: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  headerImage: string;

  @Prop({ default: 0 })
  currentPrice: number;

  @Prop({ default: 0 })
  originalPrice: number;

  @Prop({ default: 0 })
  discountPercent: number;

  @Prop({ type: [String], default: [] })
  genres: string[];

  @Prop()
  developer: string;

  @Prop()
  shortDescription: string;

  @Prop({ type: Number, default: null })
  targetPrice: number | null;

  @Prop({ default: 'THB' })
  currency: string;
}

export const WishlistItemSchema = SchemaFactory.createForClass(WishlistItem);
