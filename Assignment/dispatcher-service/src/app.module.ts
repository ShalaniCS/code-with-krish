import { Module } from '@nestjs/common';
import { DispatcherModule } from './dispatcher/dispatcher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './dispatcher/entity/dispatcher.entity';

@Module({
  imports: [DispatcherModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOSTNAME || 'localhost',
    port: 3306,
    username: 'apiuser',
    password: 'lqazxsw2##',
    database: 'cosmos',
    entities: [Vehicle],
    synchronize: true, //only on dev
  }),],
})
export class AppModule {}
