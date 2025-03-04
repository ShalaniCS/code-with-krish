import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [NotificationsModule, TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.HOSTNAME || 'localhost',
    port : 3306,
    username: 'apiuser',
    password: 'lqazxsw2##',
    database:'cosmos',
    //entities:[Order, OrderItem],
    synchronize: true
  })]
})
export class AppModule {}
