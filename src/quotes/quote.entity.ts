import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('quote')
export class Quote {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 150,
    })
    quote: string;

    @Column({
        length: 2000,
    })
    image: string;
}