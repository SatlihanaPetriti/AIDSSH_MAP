import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SitesService } from './sites.service';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { IsPublic } from '../decorators/public.decorator';
import { SiteDto } from './DTO/site.dto';
import { SiteEntity } from './Entity/site.entity';

@Controller('sites')
@UseGuards(AuthGuard)
export class SitesController {
    constructor(private readonly sitesService: SitesService) { }

    @Get()
    @IsPublic()
    public async findAll() {
        return this.sitesService.findAll();
    }

    @Get(':id')
    @IsPublic()
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.sitesService.findById(id);
    }

    @Post()
    @Roles('admin')
    public async create(@Body() param: SiteDto): Promise<SiteEntity> {
        return this.sitesService.createSite(param);
    }

    @Put(':id')
    @Roles('admin')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() param: SiteDto) {
        return this.sitesService.updateSite(id, param);
    }

    @Delete(':id')
    @Roles('admin')
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return this.sitesService.deleteSite(id);
    }
}
