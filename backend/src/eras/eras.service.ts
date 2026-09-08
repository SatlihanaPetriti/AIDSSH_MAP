import { HttpStatus, Injectable } from '@nestjs/common';
import { EraEntity } from './Entity/era.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';
import { EraDto } from './DTO/era.dto';

@Injectable()
export class ErasService {
    constructor(
        @InjectRepository(EraEntity)
        private readonly eraRepository: Repository<EraEntity>
    ) { }

    public async findAll(cityId?: number): Promise<EraEntity[]> {
        try {
            return await this.eraRepository.find(cityId ? { where: { cityId } } : {});
        } catch (error) {
            throw new ErrorHandler('Failed to get eras', HttpStatus.BAD_REQUEST);
        }
    }

    public async findById(id: number): Promise<EraEntity | null> {
        try {
            return await this.eraRepository.findOne({ where: { id } }) ?? null;
        } catch (error) {
            throw new ErrorHandler('Failed to find era by id', HttpStatus.BAD_REQUEST);
        }
    }

    public async createEra(era: EraDto): Promise<EraEntity> {
        try {
            return await this.eraRepository.save(era);
        } catch (error) {
            throw new ErrorHandler('Failed to create era', HttpStatus.BAD_REQUEST);
        }
    }

    public async updateEra(id: number, data: Partial<EraEntity>): Promise<EraEntity> {
        const existing = await this.eraRepository.findOne({ where: { id } });
        if (!existing) {
            throw new ErrorHandler('Era not found', HttpStatus.NOT_FOUND);
        }

        try {
            await this.eraRepository.update(id, data);
            const updated = await this.eraRepository.findOne({ where: { id } });
            if (!updated) {
                throw new ErrorHandler('Era not found after update', HttpStatus.NOT_FOUND);
            }
            return updated;
        } catch (error) {
            throw new ErrorHandler('Failed to update era', HttpStatus.BAD_REQUEST);
        }
    }

    public async deleteEra(id: number): Promise<{ message: string }> {
        const existing = await this.eraRepository.findOne({ where: { id } });
        if (!existing) {
            throw new ErrorHandler('Era not found', HttpStatus.NOT_FOUND);
        }

        try {
            await this.eraRepository.delete(id);
            return { message: 'Era deleted successfully' };
        } catch (error) {
            throw new ErrorHandler('Failed to delete era', HttpStatus.BAD_REQUEST);
        }
    }
}
