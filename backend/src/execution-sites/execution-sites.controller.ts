import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ExecutionSitesService } from './execution-sites.service';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { IsPublic } from '../decorators/public.decorator';
import { ExecutionSiteDto } from './DTO/execution-site.dto';
import { ExecutionSiteEntity } from './Entity/execution-site.entity';

@Controller('execution-sites')
@UseGuards(AuthGuard)
export class ExecutionSitesController {
    constructor(private readonly executionSitesService: ExecutionSitesService) { }

    @Get()
    @IsPublic()
    public async findAll() {
        return this.executionSitesService.findAll();
    }

    @Get(':id')
    @IsPublic()
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.executionSitesService.findById(id);
    }

    @Post()
    @Roles('admin')
    public async create(@Body() param: ExecutionSiteDto): Promise<ExecutionSiteEntity> {
        return this.executionSitesService.createExecutionSite(param);
    }

    @Put(':id')
    @Roles('admin')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() param: ExecutionSiteDto) {
        return this.executionSitesService.updateExecutionSite(id, param);
    }

    @Delete(':id')
    @Roles('admin')
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return this.executionSitesService.deleteExecutionSite(id);
    }
}
