import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
// import { Section } from "./section.entity";

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany(
  //   type => Section,
  //   section => section.module
  // )
  // sections: Section[];
}
