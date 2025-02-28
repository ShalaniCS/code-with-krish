import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './entity/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
    

    constructor(

        @InjectRepository(Customer)
        private readonly customerRepository : Repository<Customer>

    ){}

    async create(createCustomerDto: CreateCustomerDto) : Promise<Customer>{
        const customer = await this.customerRepository.create(createCustomerDto);
        return this.customerRepository.save(customer);
    }

    async customerById(id: number) {
        return this.customerRepository.findOne({where: {id}});
    }

    async allCustomers() {
        return await this.customerRepository.find();
    }

}
