import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Role } from "./role.entity";
import { Section } from "./section.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 30 })
  surname: string;

  @Column({ length: 40 })
  email: string;

  @Column({ length: 30 })
  @Unique(["username"])
  username: string;

  @Column({ length: 60 })
  password: string;

  @Column({ length: 70 })
  photo: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
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
