import { Type } from 'class-transformer';
import { IsArray, IsInt, isInt, IsNotEmpty, ValidateNested } from 'class-validator';

class OrderItemDto {
  @IsInt()
  productId: number;
  @IsInt()
  price: number;
  @IsInt()
  quantity: number;
}

export class createOrderDto {
  @IsInt()
  customerId: number;
  @IsNotEmpty()
  city:String;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
