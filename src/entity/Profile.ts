import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: string;

    @OneToOne(() => User, (user) => user.profile)
    user: User;
}