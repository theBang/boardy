const { DataSource } = require("typeorm");
const UserEntity = require("./models/entity/UserEntity");
const NoteEntity = require("./models/entity/NoteEntity");

module.exports = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [UserEntity, NoteEntity],
    synchronize: true,
    logging: true
});
