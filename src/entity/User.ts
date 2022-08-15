import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
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