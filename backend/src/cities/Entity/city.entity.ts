import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('city')
export class CityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({ nullable: true })
    subtitle: string;

    @Column('double')
    lat: number;

    @Column('double')
    lon: number;

    @Column({ type: 'int', default: 12 })
    zoom: number;
}
