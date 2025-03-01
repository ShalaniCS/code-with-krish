import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { HttpModule } from '@nestjs/axios';
import { createOrderResponseDto, CustomerDto } from './dto/create-order-response.dto';

@Module({
  imports:[TypeOrmModule.forFeature([Order, OrderItem]), HttpModule],
  providers: [OrdersService, createOrderResponseDto, CustomerDto],
  controllers: [OrdersController]
})
export class OrdersModule {}
