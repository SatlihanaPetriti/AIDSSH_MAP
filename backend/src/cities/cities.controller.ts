import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { IsPublic } from '../decorators/public.decorator';
import { CityDto } from './DTO/city.dto';
import { CityEntity } from './Entity/city.entity';

@Controller('cities')
@UseGuards(AuthGuard)
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) { }

    @Get()
    @IsPublic()
    public async findAll() {
        return this.citiesService.findAll();
    }

    @Get('slug/:slug')
    @IsPublic()
    public async findBySlug(@Param('slug') slug: string) {
        return this.citiesService.findBySlug(slug);
    }

    @Get(':id')
    @IsPublic()
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.citiesService.findById(id);
    }

    @Post()
    @Roles('admin')
    public async create(@Body() param: CityDto): Promise<CityEntity> {
        return this.citiesService.createCity(param);
    }

    @Put(':id')
    @Roles('admin')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() param: CityDto) {
        return this.citiesService.updateCity(id, param);
    }

    @Delete(':id')
    @Roles('admin')
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return this.citiesService.deleteCity(id);
    }
}
