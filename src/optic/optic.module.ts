import { Module } from '@nestjs/common';
import { OpticController } from './optic.controller';
import { OpticService } from './optic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Optic } from '../database/entity/optic.entity';

@Module({
  controllers: [OpticController],
  providers: [OpticService],
  imports: [TypeOrmModule.forFeature([Optic])],
})
export class OpticModule {}
