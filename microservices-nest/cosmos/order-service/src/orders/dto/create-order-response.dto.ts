import { Type } from "class-transformer";
import { IsArray, IsInt, ValidateNested } from "class-validator";

class OrderItemDto{

    @IsInt()
    productId:number;

    @IsInt()
    price: number;

    @IsInt()
    quantity:number;

}

export class CustomerDto{

    @IsInt()
    id: number;

    name:String;

    email:String;

    address:String;

}


export class createOrderResponseDto{

    @IsInt()
    customerId:number;

    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>OrderItemDto)
    items:OrderItemDto[];

    @ValidateNested()
    @Type(()=>CustomerDto)
    customerDetails: CustomerDto;

}