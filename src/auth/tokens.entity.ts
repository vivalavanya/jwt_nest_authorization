import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tokens {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    refresh_token: string;

}