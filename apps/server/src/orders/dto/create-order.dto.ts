import { IsInt, IsArray, IsNumber, IsString, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  storeId: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @Type(() => Number)
  @IsInt()
  totalPages: number;

  @Transform(({ value }) => {
    if (!value) return [];
    return Array.isArray(value) ? value.map(Number) : String(value).split(',').map(Number);
  })
  @IsArray()
  @IsInt({ each: true })
  colorPages: number[];

  @Transform(({ value }) => {
    if (!value) return [];
    return Array.isArray(value) ? value.map(Number) : String(value).split(',').map(Number);
  })
  @IsArray()
  @IsInt({ each: true })
  bwPages: number[];

  @Type(() => Number)
  @IsNumber()
  totalPrice: number;

  @IsString()
  @IsOptional()
  paymentMethod?: string;
}
