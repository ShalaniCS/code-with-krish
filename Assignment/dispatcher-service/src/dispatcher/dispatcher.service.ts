import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createVehicleDto } from './dto/create-vehicle.dto';
import { Repository } from 'typeorm';
import { Vehicle } from './entity/dispatcher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Kafka } from 'kafkajs';
import { IsEmpty } from 'class-validator';
import { Redis } from 'ioredis';

@Injectable()
export class DispatcherService {

    private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
    private readonly producer = this.kafka.producer();
    private readonly consumer = this.kafka.consumer({ groupId: 'shalani-dispatcher-service' });

    private readonly redis = new Redis({ host: '3.0.159.213', port: 6379 });


    constructor(
        @InjectRepository(Vehicle)
        private readonly dispatcherRepository: Repository<Vehicle>
    ) { }

    async onModuleInit() {
        //await this.producer.connect();
        await this.consumer.connect();
        await this.consumeOrderConfirmed();
    }

    async releaseVehicle(vehicleNumber){
        const lockKey = `shalani:vehicle:${vehicleNumber}:lock`;
          const lock = await this.redis.del(lockKey);
          if (!lock) {
            throw new BadRequestException(`vehicle with number ${vehicleNumber} already released`);
          }
    }

    async createVehicle(createVehicleDto: createVehicleDto): Promise<Vehicle> {
        const vehicle = this.dispatcherRepository.create(createVehicleDto);
        return this.dispatcherRepository.save(vehicle);
    }

    async vehicleByCity(city: String) {
        return await this.dispatcherRepository.find({ where: { city } });
    }

    async consumeOrderConfirmed() {
        await this.consumer.subscribe({ topic: 'shalani.order.confirmed' });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                console.log('consumed in dispatcher service');

                const message1 = JSON.parse(message.value.toString());
                console.log(message1);

                const city = message1.city;
                console.log(city);
                const vehicles = await this.vehicleByCity(city);
                if (vehicles.length == 0) {
                    console.log('cannot find vehicle for order');
                    throw new NotFoundException(`cannot find a vehicle for ${city}`);
                }
                for (const vehicle of vehicles) {
                    const lockKey = `shalani:vehicle:${vehicle.vehicleNumber}:lock`;
                    const lock = await this.redis.set(lockKey, new Date().getTime(), 'EX', 36000 * 24, 'NX');
                    // if (!lock) {
                    //     throw new BadRequestException(`vehicle of numebr ${vehicle.vehicleNumber} is in use`);
                    // }
                    if(lock){
                        console.log(`vehicle with number ${vehicle.vehicleNumber} allocated`)
                        break;
                    }
                    console.log('all vehicles occupied');
                }
            }
        })
    }

}
