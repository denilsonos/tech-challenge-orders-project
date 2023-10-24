import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "./user/adapters/out/user-entity"

const dbConfig: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
}

export const AppDataSource = new DataSource(dbConfig)
