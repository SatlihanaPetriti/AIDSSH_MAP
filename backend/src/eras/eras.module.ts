import { Module } from '@nestjs/common';
import { ErasController } from './eras.controller';
import { ErasService } from './eras.service';
import { EraEntity } from './Entity/era.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([EraEntity])],
  controllers: [ErasController],
  providers: [ErasService],
  exports: [ErasService]
})
export class ErasModule { }
