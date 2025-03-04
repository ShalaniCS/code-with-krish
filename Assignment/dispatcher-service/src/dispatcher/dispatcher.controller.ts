import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DispatcherService } from './dispatcher.service';
import { createVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entity/dispatcher.entity';

@Controller('dispatcher')
export class DispatcherController {

    constructor(
        private readonly dispatcherService:DispatcherService
    ){}

    @Post()
    async createVehicle(
        @Body() createVehicleDto: createVehicleDto,
    ) : Promise<Vehicle>{
        return this.dispatcherService.createVehicle(createVehicleDto);
    }

    @Get(':city')
    async getVehicleByCity (
        @Param('city') city : String
    ) :Promise<Vehicle[]>{
        return this.dispatcherService.vehicleByCity(city);
    }

    @Patch(':vehicleNumber/release')
    async releaseVehicle(
      @Param('vehicleNumber') vehicleNumber: String
    ) {
      return await this.dispatcherService.releaseVehicle(vehicleNumber);
    }

}
