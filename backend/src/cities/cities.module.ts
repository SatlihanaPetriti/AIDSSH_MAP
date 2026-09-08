import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CityEntity } from './Entity/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService]
})
export class CitiesModule { }
