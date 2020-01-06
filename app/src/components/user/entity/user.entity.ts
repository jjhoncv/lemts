import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from './role.entity'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    @Unique(['email'])
    email: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    photo: string;

    @Column()
    createdAt: string;

    @Column({ default: true })
    reading: boolean;

    @Column({ default: true })
    writing: boolean;

    @OneToOne(type => Role)
    @JoinColumn()
    role: Role;
}