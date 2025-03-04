import { Module } from '@nestjs/common';
import { DispatcherService } from './dispatcher.service';
import { DispatcherController } from './dispatcher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entity/dispatcher.entity';

@Module({
  providers: [DispatcherService],
  controllers: [DispatcherController],
  imports: [TypeOrmModule.forFeature([Vehicle])],
})
export class DispatcherModule {}
