import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entity/inventory.entity';
import { AvailabilityDto } from './dto/availability.dto';

@Module({
  imports:[TypeOrmModule.forFeature([Inventory])],
  providers: [InventoryService, AvailabilityDto],
  controllers: [InventoryController]
})
export class InventoryModule {}
