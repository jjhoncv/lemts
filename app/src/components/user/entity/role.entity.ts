import { ManyToOne, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @ManyToOne(type => User, user => user.roles)
    // user: User;
}


// roles   user

