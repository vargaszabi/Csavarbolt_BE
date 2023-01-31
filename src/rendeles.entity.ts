import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rendeles{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    csavar_id: number;

    @Column()
    db: number;
}