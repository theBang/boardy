import { DataSource } from "typeorm";

import { User } from "./entity/User";
import { Note } from "./entity/Note";

export const appDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [User, Note],
    synchronize: true,
    logging: true
});


