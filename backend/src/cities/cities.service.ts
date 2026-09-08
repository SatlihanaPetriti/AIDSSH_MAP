import { HttpStatus, Injectable } from '@nestjs/common';
import { CityEntity } from './Entity/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';
import { CityDto } from './DTO/city.dto';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>
    ) { }

    public async findAll(): Promise<CityEntity[]> {
        try {
            return await this.cityRepository.find();
        } catch (error) {
            throw new ErrorHandler('Failed to get cities', HttpStatus.BAD_REQUEST);
        }
    }

    public async findById(id: number): Promise<CityEntity | null> {
        try {
            return await this.cityRepository.findOne({ where: { id } }) ?? null;
        } catch (error) {
            throw new ErrorHandler('Failed to find city by id', HttpStatus.BAD_REQUEST);
        }
    }

    public async findBySlug(slug: string): Promise<CityEntity | null> {
        try {
            return await this.cityRepository.findOne({ where: { slug } }) ?? null;
        } catch (error) {
            throw new ErrorHandler('Failed to find city by slug', HttpStatus.BAD_REQUEST);
        }
    }

    public async createCity(city: CityDto): Promise<CityEntity> {
        try {
            return await this.cityRepository.save(city);
        } catch (error) {
            throw new ErrorHandler('Failed to create city', HttpStatus.BAD_REQUEST);
        }
    }

    public async updateCity(id: number, data: Partial<CityEntity>): Promise<CityEntity> {
        const existing = await this.cityRepository.findOne({ where: { id } });
        if (!existing) {
            throw new ErrorHandler('City not found', HttpStatus.NOT_FOUND);
        }

        try {
            await this.cityRepository.update(id, data);
            const updated = await this.cityRepository.findOne({ where: { id } });
            if (!updated) {
                throw new ErrorHandler('City not found after update', HttpStatus.NOT_FOUND);
            }
            return updated;
        } catch (error) {
            throw new ErrorHandler('Failed to update city', HttpStatus.BAD_REQUEST);
        }
    }

    public async deleteCity(id: number): Promise<{ message: string }> {
        const existing = await this.cityRepository.findOne({ where: { id } });
        if (!existing) {
            throw new ErrorHandler('City not found', HttpStatus.NOT_FOUND);
        }

        try {
            await this.cityRepository.delete(id);
            return { message: 'City deleted successfully' };
        } catch (error) {
            throw new ErrorHandler('Failed to delete city', HttpStatus.BAD_REQUEST);
        }
    }
}
