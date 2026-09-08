import { Module } from '@nestjs/common';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';
import { SiteEntity } from './Entity/site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([SiteEntity])],
  controllers: [SitesController],
  providers: [SitesService],
  exports: [SitesService]
})
export class SitesModule { }
