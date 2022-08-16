import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    text: string;

    @ManyToOne(() => User, (user) => user.notes)
    user: User;
}
