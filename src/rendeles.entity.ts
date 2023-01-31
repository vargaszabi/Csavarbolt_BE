import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Csavar } from './csavar.entity';

@Entity()
export class Rendeles{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Csavar, (csavar) => csavar.id)
    csavar_id : Csavar

    @Column()
    db: number;
}