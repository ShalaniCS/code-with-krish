import { IsNotEmpty } from "class-validator";

export class createProductDto{

    @IsNotEmpty()
    name : String;

    @IsNotEmpty()
    price : number;

    @IsNotEmpty()
    quantity : number;

}