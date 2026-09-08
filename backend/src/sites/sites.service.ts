import { HttpStatus, Injectable } from '@nestjs/common';
import { SiteEntity } from './Entity/site.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';
import { SiteDto } from './DTO/site.dto';

@Injectable()
export class SitesService {
    constructor(
        @InjectRepository(SiteEntity)
        private readonly siteRepository: Repository<SiteEntity>
    ) { }

    public async findAll(): Promise<SiteEntity[]> {
        try {
            return await this.siteRepository.find();
        } catch (error) {
            throw new ErrorHandler('Failed to get sites', HttpStatus.BAD_REQUEST);
        }
    }

    public async findById(id: number): Promise<SiteEntity | null> {
        try {
            return await this.siteRepository.findOne({ where: { id } }) ?? null;
        } catch (error) {
            throw new ErrorHandler('Failed to find site by id', HttpStatus.BAD_REQUEST);
        }
    }

    public async createSite(site: SiteDto): Promise<SiteEntity> {
        try {
            return await this.siteRepository.save(site);
        } catch (error) {
            throw new ErrorHandler('Failed to create site', HttpStatus.BAD_REQUEST);
        }
    }

    public async updateSite(id: number, data: Partial<SiteEntity>): Promise<SiteEntity> {
        const existing = await this.siteRepository.findOne({ where: { id } });
        if (!existing) {
            throw new ErrorHandler('Site not found', HttpStatus.NOT_FOUND);
        }

        try {
            await this.siteRepository.update(id, data);
            const updated = await this.siteRepository.findOne({ where: { id } });
            if (!updated) {
                throw new ErrorHandler('Site not found after update', HttpStatus.NOT_FOUND);
            }
            return updated;
        } catch (error) {
            throw new ErrorHandler('Failed to update site', HttpStatus.BAD_REQUEST);
        }
    }

    public async deleteSite(id: number): Promise<{ message: string }> {
        const existing = await this.siteRepository.findOne({ where: { id } });
        if (!existing) {
            throw new ErrorHandler('Site not found', HttpStatus.NOT_FOUND);
        }

        try {
            await this.siteRepository.delete(id);
            return { message: 'Site deleted successfully' };
        } catch (error) {
            throw new ErrorHandler('Failed to delete site', HttpStatus.BAD_REQUEST);
        }
    }
}
