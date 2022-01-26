import { ConnectionOptions } from "typeorm";
import Dotenv from "dotenv";

// .env
Dotenv.config();

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        "src/entities/**/*.ts"
    ],
    migrations: [

    ],
    subscribers: [

    ],
    cli: {
        entitiesDir: "src/entities",
    }
}

export default connectionOptions;