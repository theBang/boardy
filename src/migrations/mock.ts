import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Note } from "../entity/Note";

async function createUsers(db: DataSource) {
    const users = [];
    for (let i = 0; i < 3; i++) {
        const notes = [];
        const userName = `user${i}`;
        // for (let j = 0; j < 3; j++) {
        //     const note = new Note();
        //     note.title = `${userName}: note title ${j}`;
        //     note.text = `${userName}: note text ${j}`;
        //     notes.push(note);
        // }
        const user = new User();
        user.name = userName;
        // user.notes = notes;
        users.push(user);
    }

    console.log("users", users);
    await db.getRepository(User).save(users);
}

export default async function (db: DataSource) {
    await createUsers(db);
}
