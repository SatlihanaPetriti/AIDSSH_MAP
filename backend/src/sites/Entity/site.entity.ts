import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('site')
export class SiteEntity {
    @PrimaryGeneratedColumn()
    id: number;

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
