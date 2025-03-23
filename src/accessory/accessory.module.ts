import { Module } from '@nestjs/common';
import { SoundReducerService } from './sound-reducer/sound-reducer.service';
import { SoundReducerController } from './sound-reducer/sound-reducer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoundNoiseReducer } from '../database/entity/sound-noise-reducer.entity';
import { CommonModule } from '../common/common.module';

@Module({
  providers: [SoundReducerService],
  controllers: [SoundReducerController],
  imports: [TypeOrmModule.forFeature([SoundNoiseReducer]), CommonModule],
})
export class AccessoryModule {}
