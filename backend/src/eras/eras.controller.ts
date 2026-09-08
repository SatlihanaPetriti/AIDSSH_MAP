import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ErasService } from './eras.service';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { IsPublic } from '../decorators/public.decorator';
import { EraDto } from './DTO/era.dto';
import { EraEntity } from './Entity/era.entity';

@Controller('eras')
@UseGuards(AuthGuard)
export class ErasController {
    constructor(private readonly erasService: ErasService) { }

    @Get()
    @IsPublic()
    public async findAll(@Query('cityId') cityId?: string) {
        return this.erasService.findAll(cityId ? parseInt(cityId, 10) : undefined);
    }

    @Get(':id')
    @IsPublic()
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.erasService.findById(id);
    }

    @Post()
    @Roles('admin')
    public async create(@Body() param: EraDto): Promise<EraEntity> {
        return this.erasService.createEra(param);
    }

    @Put(':id')
    @Roles('admin')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() param: EraDto) {
        return this.erasService.updateEra(id, param);
    }

    @Delete(':id')
    @Roles('admin')
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return this.erasService.deleteEra(id);
    }
}
