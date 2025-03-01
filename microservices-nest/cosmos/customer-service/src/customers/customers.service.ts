import { Injectable, NotFoundException } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
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

    async customerById(id: number) : Promise<Customer> {
        console.log('customer');
        console.log(id);
        const customer = await this.customerRepository.findOne({where : {id}});
        console.log(customer);
        if(customer===null){
            console.log('customer null');
            throw new NotFoundException(`customer with id ${id} not found`);
        }
        console.log('end of customer method');
        return customer;
    }

    async allCustomers() {
        return await this.customerRepository.find();
    }

}
