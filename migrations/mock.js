const User = require("../models/User");

async function createUsers(db) {
    const userRepo = db.getRepository(User);
    const users = [];
    for(let i=0; i < 3; i++) {
        users.push(await userRepo.create({ name: `Mockman${i}` }));
    }

    const results = await userRepo.save(users);

    return results;
}

module.exports = async function (db) {
    await createUsers(db);
}
