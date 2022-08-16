import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
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
}

// module.exports = new EntitySchema({
//     relations: {
//         notes: {
//             target: "Note",
//             type: "one-to-many",
//             cascade: true
//         }
//     }
// });