const { DataSource } = require("typeorm");
const User = require("./models/User");

module.exports = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [User],
    synchronize: true,
    logging: true
});
