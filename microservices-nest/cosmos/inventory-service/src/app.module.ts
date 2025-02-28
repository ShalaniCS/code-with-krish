import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventory/entity/inventory.entity';
@Module({
  imports: [InventoryModule, TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.HOSTNAME || 'localhost',
    port : 3306,
    username: 'apiuser',
    password: 'lqazxsw2##',
    database:'cosmos',
    entities:[Inventory],
    synchronize: true
  })],
})
export class AppModule {}
