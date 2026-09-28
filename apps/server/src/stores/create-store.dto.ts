import { IsString, IsNumber, IsOptional, IsArray, Length, IsBoolean } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @Length(12, 12, { message: 'Store ID must be exactly 12 characters' })
  id: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  basePrice: number;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  services?: string[];

  @IsOptional()
  @IsString()
  openTime?: string;

  @IsOptional()
  @IsString()
  closeTime?: string;
}
