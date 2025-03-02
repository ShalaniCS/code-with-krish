import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { createProductDto } from './dto/create-pproduct.dto';

@Controller('/inventory')
export class InventoryController {

    constructor(private inventoryService : InventoryService){}

    @Post()
    async create(@Body() createProductDto : createProductDto){
        return await this.inventoryService.create(createProductDto);
    }

    @Get(':id')
    async getProductById(@Param('id') id:number){
        return await this.inventoryService.productById(id);
    }

    @Get()
    async getAllProducts(){
        return await this.inventoryService.allProducts();
    }

    @Get(':id/validate')
    async validateStock(
        @Param('id') id:number,
        @Query('quantity') quantity:number
    ){
        return await this.inventoryService.validateStock(id, quantity);
    }

    @Patch(':id/reduce')
    async reduceInventory(
        @Param('id') id: number,
        @Query('quantity') quantity:number
    ){
        console.log('in controller');
        return await this.inventoryService.reduceInventoryy(id, quantity);
    }

}
