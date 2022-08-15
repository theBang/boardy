import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    text: string;
}

// module.exports = new EntitySchema({
//     relations: {
//         user: {
//             target: "User",
//             type: "many-to-one"
//         }
//     }
// });