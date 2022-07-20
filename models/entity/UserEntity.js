const { EntitySchema } = require("typeorm");
const User = require("../model/User");
const Note = require("../model/Note");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    target: User,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }
    },
    relations: {
        notes: {
            target: "Note",
            type: "one-to-many"
        }
    }
});