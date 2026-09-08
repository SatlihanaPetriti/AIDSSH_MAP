import { HttpStatus, Injectable } from '@nestjs/common';
import { ExecutionSiteEntity } from './Entity/execution-site.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';
import { ExecutionSiteDto } from './DTO/execution-site.dto';

@Injectable()
export class ExecutionSitesService {
    constructor(
        @InjectRepository(ExecutionSiteEntity)
        private readonly executionSiteRepository: Repository<ExecutionSiteEntity>
    ) { }

    public async findAll(): Promise<ExecutionSiteEntity[]> {
        try {
            return await this.executionSiteRepository.find();
        } catch (error) {
            throw new ErrorHandler('Failed to get execution sites', HttpStatus.BAD_REQUEST);
        }
    }

    public async findById(id: number): Promise<ExecutionSiteEntity | null> {
        try {
            return await this.executionSiteRepository.findOne({ where: { id } }) ?? null;
        } catch (error) {
            throw new ErrorHandler('Failed to find execution site by id', HttpStatus.BAD_REQUEST);
        }
    }

    public async createExecutionSite(site: ExecutionSiteDto): Promise<ExecutionSiteEntity> {
        try {
            return await this.executionSiteRepository.save(site);
        } catch (error) {
            throw new ErrorHandler('Failed to create execution site', HttpStatus.BAD_REQUEST);
        }
    }

    public async updateExecutionSite(id: number, data: Partial<ExecutionSiteEntity>): Promise<ExecutionSiteEntity> {
        const existing = await this.executionSiteRepository.findOne({ where: { id } });
        if (!existing) {
            throw new ErrorHandler('Execution site not found', HttpStatus.NOT_FOUND);
        }

        try {
            await this.executionSiteRepository.update(id, data);
            const updated = await this.executionSiteRepository.findOne({ where: { id } });
            if (!updated) {
                throw new ErrorHandler('Execution site not found after update', HttpStatus.NOT_FOUND);
            }
            return updated;
        } catch (error) {
            throw new ErrorHandler('Failed to update execution site', HttpStatus.BAD_REQUEST);
        }
    }

    public async deleteExecutionSite(id: number): Promise<{ message: string }> {
        const existing = await this.executionSiteRepository.findOne({ where: { id } });
        if (!existing) {
            throw new ErrorHandler('Execution site not found', HttpStatus.NOT_FOUND);
        }

        try {
            await this.executionSiteRepository.delete(id);
            return { message: 'Execution site deleted successfully' };
        } catch (error) {
            throw new ErrorHandler('Failed to delete execution site', HttpStatus.BAD_REQUEST);
        }
    }
}
