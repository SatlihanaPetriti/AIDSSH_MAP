import { Module } from '@nestjs/common';
import { ExecutionSitesController } from './execution-sites.controller';
import { ExecutionSitesService } from './execution-sites.service';
import { ExecutionSiteEntity } from './Entity/execution-site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([ExecutionSiteEntity])],
  controllers: [ExecutionSitesController],
  providers: [ExecutionSitesService],
  exports: [ExecutionSitesService]
})
export class ExecutionSitesModule { }
