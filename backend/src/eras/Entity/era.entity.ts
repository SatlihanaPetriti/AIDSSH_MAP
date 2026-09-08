import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CityEntity } from "../../cities/Entity/city.entity";

@Entity('era')
export class EraEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cityId: number;

    @ManyToOne(() => CityEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cityId' })
    city: CityEntity;

    @Column()
    label: string;

    @Column('int')
    startYear: number;

    @Column('int')
    endYear: number;
}
