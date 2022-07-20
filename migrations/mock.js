const User = require("../models/model/User");

async function createUsers(db) {
    const userRepo = db.getRepository(User);
    const users = [];
    for(let i=0; i < 3; i++) {
        const user = new User();
        user.name = `Mockman${i}`;
        users.push(user);
    }

    const results = await userRepo.save(users);

    return results;
}

module.exports = async function (db) {
    await createUsers(db);
}
