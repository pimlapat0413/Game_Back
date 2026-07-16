import { IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

export class AddWishlistDto {
  @IsNumber()
  appid: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  headerImage?: string;

  @IsOptional()
  @IsNumber()
  currentPrice?: number;

  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @IsOptional()
  @IsNumber()
  discountPercent?: number;

  @IsOptional()
  @IsArray()
  genres?: string[];

  @IsOptional()
  @IsString()
  developer?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;
}

