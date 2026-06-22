import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '../database/entity/store.entity';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [TypeOrmModule.forFeature([Store])],
})
export class StoreModule {}
