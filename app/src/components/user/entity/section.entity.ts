import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from './user.entity'
import { Module } from './module.entity'

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    status: boolean;

    @ManyToOne(type => Module, module => module.sections)
    module: Module;

    // @ManyToMany(type => User, user => user.sections)
    // @JoinTable()
    // users: User[];
}