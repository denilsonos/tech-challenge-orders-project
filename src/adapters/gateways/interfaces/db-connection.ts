import { DataSource } from "typeorm"
export interface DbConnection {
    getConnection(): Promise<DataSource>;
}