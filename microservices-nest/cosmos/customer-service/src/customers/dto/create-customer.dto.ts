import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCustomerDto{

    @IsNotEmpty()
    name:String;

    @IsNotEmpty()
    email:String;

    @IsOptional()
    address:String;

}