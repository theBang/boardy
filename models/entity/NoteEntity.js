const { EntitySchema } = require("typeorm");
const Note = require("../model/Note");

module.exports = new EntitySchema({
    name: "Note", 
    target: Note,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar"
        },
        text: {
            type: "text"
        }
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one"
        }
    }
});