import { IsString } from "class-validator";

export class createVehicleDto{

    @IsString()
    vehicleNumber : String;

    @IsString()
    city:String;

}