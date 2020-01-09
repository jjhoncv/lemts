import { Entity, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, ManyToMany, JoinTable } from "typeorm";
import { Role } from './role.entity'
import { Section } from './section.entity'


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    @Unique(['username'])
    username: string;

    @Column()
    password: string;

    @Column()
    photo: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastLogin: string;

    @Column({ default: true })
    reading: boolean;

    @Column({ default: true })
    writing: boolean;

    @ManyToOne(type => Role)
    @JoinColumn()
    role: Role;

    @ManyToMany(type => Section)
    @JoinTable()
    sections: Section[];
}
