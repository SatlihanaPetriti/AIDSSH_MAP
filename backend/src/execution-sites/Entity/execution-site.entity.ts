import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('execution_site')
export class ExecutionSiteEntity {
    @PrimaryGeneratedColumn()
    id: number;

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
