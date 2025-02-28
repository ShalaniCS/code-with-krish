import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { createProductDto } from './dto/create-pproduct.dto';
import { Repository } from 'typeorm';
import { Inventory } from './entity/inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AvailabilityDto } from './dto/availability.dto';

@Injectable()
export class InventoryService {

    constructor(

        @InjectRepository(Inventory)
        private readonly inventoryRepository:Repository<Inventory>,

        private availabilityDto : AvailabilityDto

    ){}

    async create(createProductDto: createProductDto) :Promise<Inventory> {
        const product = await this.inventoryRepository.create(createProductDto);
        return this.inventoryRepository.save(product);
    }
    
    async productById(id: number) {
        return this.inventoryRepository.findOne({where: {id}});
    }

    async allProducts() {
        return this.inventoryRepository.find();
    }
    
    async validateStock(id:number, quantity:number) : Promise<AvailabilityDto>{
        const inv = await this.inventoryRepository.findOne({ where: { id } });
        if(!inv){
            throw new NotFoundException(`product with id ${id} is not found`);
        }
        const availableQty = inv.quantity;
        const availability = availableQty>quantity?true:false;
        this.availabilityDto.availability = availability;
        return this.availabilityDto;
    }

}
