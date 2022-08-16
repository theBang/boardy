import { DataSource } from "typeorm";

import { User } from "./entity/User";
import { Note } from "./entity/Note";
import { Profile } from "./entity/Profile";

export const appDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [User, Note, Profile],
    synchronize: true,
    logging: true
});


