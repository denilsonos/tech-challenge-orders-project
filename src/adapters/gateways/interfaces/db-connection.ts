export interface DbConnection {
    getConnection(): Promise<any>;
}