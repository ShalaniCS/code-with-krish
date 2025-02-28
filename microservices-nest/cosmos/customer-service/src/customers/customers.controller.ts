import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {

    constructor(private customersService : CustomersService){}

    @Post('/createCustomer')
    async create(@Body() createCustomerDto : CreateCustomerDto){
        return await this.customersService.create(createCustomerDto);
    }

    @Get(':id')
    async getCustomerById(@Param('id') id:number){
        return await this.customersService.customerById(id);
    }

    @Get()
    async getAllCustomers(){
        return await this.customersService.allCustomers();
    }

}
