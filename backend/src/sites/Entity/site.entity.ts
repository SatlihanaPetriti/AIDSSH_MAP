import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CityEntity } from "../../cities/Entity/city.entity";

@Entity('site')
export class SiteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cityId: number;

    @ManyToOne(() => CityEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cityId' })
    city: CityEntity;

    @Column()
    dosja: string;

    @Column()
    objekti: string;

    @Column()
    tipiRaw: string;

    @Column('double')
    lat: number;

    @Column('double')
    lon: number;

    @Column()
    fondi: string;

    @Column({ nullable: true })
    dataHapjes: string;

    @Column({ nullable: true })
    dataMbylljes: string;
}
