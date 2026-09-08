import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CityEntity } from "../../cities/Entity/city.entity";

@Entity('execution_site')
export class ExecutionSiteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cityId: number;

    @ManyToOne(() => CityEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cityId' })
    city: CityEntity;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: ['ekzekutim_varrim', 'ekzekutim', 'varrim'],
    })
    type: string;

    @Column('double')
    lat: number;

    @Column('double')
    lon: number;

    @Column()
    color: string;

    @Column('text')
    description: string;

    @Column({ type: 'int', default: 1000 })
    fadeMaxRadius: number;
}
