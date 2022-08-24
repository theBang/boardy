import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Note } from "./Note";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;

    @OneToMany(() => Note, (note) => note.user)
    notes: Note[]
}
