import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { IsNull, Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { createOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { createOrderResponseDto, CustomerDto } from './dto/create-order-response.dto';

@Injectable()
export class OrdersService {
    
    private readonly inventoryServiceUrl = 'http://localhost:3002/inventory';

    private readonly customerServiceUrl = 'http://localhost:3001/customers';
   
    constructor(

        @InjectRepository(Order) 
        private readonly orderRepository : Repository<Order>,

        @InjectRepository(OrderItem)
        private readonly orderItemRepository : Repository<OrderItem>,

        private readonly httpService : HttpService,

        private createOrderResponseDto : createOrderResponseDto,

        private customerDto : CustomerDto

    ){}

    async create(createOrderDto:createOrderDto): Promise<createOrderResponseDto>{
        const {customerId, items} = createOrderDto;
        let customerDetails2;
        console.log(customerId);
        console.log('111');

        try{
            console.log('inside try 1');
            const response$ = this.httpService.get(`${this.customerServiceUrl}/${customerId}`);
            customerDetails2 = await lastValueFrom(response$);
            console.log(customerDetails2.data);
            console.log('inside try 2');
            
        }
        catch(error){
            console.log(error);
            throw new BadRequestException(
                `error checking if a customer with id ${customerId} exists, or a customr with id ${customerId} does not exist`
            );
        }

        for (const item of items){
            try{
                console.log(item)
                const response$ = this.httpService.get(
                    `${this.inventoryServiceUrl}/${item.productId}/validate?quantity=${item.quantity}`
                );
                console.log('test');
                const response = await lastValueFrom(response$);
                //console.log(response);
                if(!response.data.availability){
                    throw new BadRequestException(`product id ${item.productId} is unavailable`)
                }
            }
            catch(error){
                throw new BadRequestException(`error checking stock for product id ${item.productId} : ${error.message}`);
            }
        }

        const order = this.orderRepository.create({
            customerId,
            status:'PENDING',
        });

        const savedOrder = await this.orderRepository.save(order);

        const orderItems = items.map((item)=>(
            this.orderItemRepository.create({
                productId:item.productId,
                price:item.price,
                quantity:item.quantity,
                order:savedOrder
            })
        ))

        const custId = customerDetails2.data.customerId;

        await this.orderItemRepository.save(orderItems);
        const order1 = this.orderRepository.findOne({
            where: {id: savedOrder.id},
            relations: ['items']
        });

        for(const item of items){
            try{
                console.log('reduce inventory');
                const response$ = this.httpService.patch(`${this.inventoryServiceUrl}/${item.productId}/reduce?quantity=${item.quantity}`);
            }
            catch(error){
                throw new BadRequestException(`error reducing inventory for product id ${item.productId}`);
            }
        }

        console.log(customerDetails2.data.name);
        this.createOrderResponseDto.customerDetails = new CustomerDto();
        this.createOrderResponseDto.customerId = customerId;
        this.createOrderResponseDto.items = orderItems;
        this.createOrderResponseDto.customerDetails.id = customerId;
        this.createOrderResponseDto.customerDetails.name = customerDetails2.data.name;
        this.createOrderResponseDto.customerDetails.email = customerDetails2.data.email;
        this.createOrderResponseDto.customerDetails.address = customerDetails2.data.address;
        return this.createOrderResponseDto;

    }

    async fetch(id:any){
        return this.orderRepository.findOne({
            where: {id},
            relations: ['items']
        });
    }

    async fetchAll() {
        return this.orderRepository.find({
            relations: ['items']
        });
    }

    async updateOrderStatus(id:number, updateStatus:UpdateOrderStatus) : Promise<Order> {
        const order = await this.orderRepository.findOne({where:{id}});
        if(!order){
            throw new NotFoundException(`order with id ${id} is not found`);
        }
        if(order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED){
            throw new BadRequestException(
                `order status cannot be changes when it is delivered or cancelled`,
            );
        }
        order.status = updateStatus.status;
        return this.orderRepository.save(order);
    }

}
