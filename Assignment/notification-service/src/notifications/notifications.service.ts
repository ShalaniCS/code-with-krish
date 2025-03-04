import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationsService implements OnModuleInit{

    private readonly kafka = new Kafka ({brokers: ['3.0.159.213:9092']});
    private readonly producer = this.kafka.producer();
    private readonly consumer = this.kafka.consumer({groupId:'shalani-notification-service'});

    constructor(){}

    async onModuleInit() {
        await this.consumer.connect();
        await this.consumeOrderConfirmed();
    }

    async consumeOrderConfirmed(){
        await this.consumer.subscribe({topic:'shalani.order.confirmed'});
        await this.consumer.run({
            eachMessage: async({message})=>{
                console.log('consumed in notification service');
                console.log('order successfully created');
                const message1 = JSON.parse(message.value.toString());
                console.log(message1);
            }
        })
    }

}
