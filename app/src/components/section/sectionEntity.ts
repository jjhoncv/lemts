import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import { Module } from "./../module/moduleEntity";

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

  @ManyToOne(type => Module)
  @JoinColumn()
  module: Module;
}
