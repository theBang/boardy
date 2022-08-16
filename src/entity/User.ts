import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Note } from "./Note";
import { Profile } from "./Profile";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Profile, (profile) => profile.user)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Note, (note) => note.user)
    notes: Note[]
}
