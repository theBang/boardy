const User = require("../models/model/User");
const Note = require("../models/model/Note");

async function createUsers(db) {
    const users = [];
    for (let i = 0; i < 3; i++) {
        const notes = [];
        const userName = `user${i}`;
        for (let j = 0; j < 3; j++) {
            const note = new Note();
            note.title = `${userName}: note title ${j}`;
            note.text = `${userName}: note text ${j}`;
            notes.push(note);
        }
        const user = new User();
        user.name = userName;
        user.notes = notes;
        users.push(user);
    }

    console.log("users", users);
    const results = await db.getRepository(User).save(users);
    return results;
}

module.exports = async function (db) {
    await createUsers(db);
}
