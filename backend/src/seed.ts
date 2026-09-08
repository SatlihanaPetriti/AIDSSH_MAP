import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { CityEntity } from './cities/Entity/city.entity';
import { SiteEntity } from './sites/Entity/site.entity';
import { ExecutionSiteEntity } from './execution-sites/Entity/execution-site.entity';
import { EraEntity } from './eras/Entity/era.entity';

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [CityEntity, SiteEntity, ExecutionSiteEntity, EraEntity],
    synchronize: true,
});

function readSeedFile(fileName: string) {
    const filePath = path.join(__dirname, '../seed-data', fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

async function seed() {
    await dataSource.initialize();
    console.log('Connected to database');

    const cityRepository = dataSource.getRepository(CityEntity);
    const siteRepository = dataSource.getRepository(SiteEntity);
    const executionSiteRepository = dataSource.getRepository(ExecutionSiteEntity);
    const eraRepository = dataSource.getRepository(EraEntity);

    await siteRepository.clear();
    await executionSiteRepository.clear();
    await eraRepository.clear();
    await dataSource.query('DELETE FROM city');

    const tirana = await cityRepository.save({
        name: 'Tiranë',
        slug: 'tirane',
        subtitle: 'DPB Tiranë',
        lat: 41.33,
        lon: 19.82,
        zoom: 12,
    });
    console.log('Seeded city:', tirana.name);

    const orvSites = readSeedFile('orv-sites.json').map((site: Record<string, unknown>) => ({
        ...site,
        cityId: tirana.id,
    }));
    await siteRepository.save(orvSites);
    console.log('Seeded sites:', orvSites.length);

    const executionSites = readSeedFile('execution-sites.json').map((site: Record<string, unknown>) => ({
        ...site,
        cityId: tirana.id,
    }));
    await executionSiteRepository.save(executionSites);
    console.log('Seeded execution sites:', executionSites.length);

    await eraRepository.save([
        { cityId: tirana.id, label: '1969–1979', startYear: 1969, endYear: 1979 },
        { cityId: tirana.id, label: '1980–1991', startYear: 1980, endYear: 1991 },
    ]);
    console.log('Seeded eras: 2');

    await dataSource.destroy();
    console.log('Done');
}

seed().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
