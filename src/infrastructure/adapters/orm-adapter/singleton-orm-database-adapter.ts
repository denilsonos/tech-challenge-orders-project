import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Order } from '../../../domain/entitites/order'
import { Item } from '../../../domain/entitites/item'
import { DatabaseAdapter } from '../database-adapter'

export class SingletonOrmDatabaseAdapter implements DatabaseAdapter {
  private static instance: SingletonOrmDatabaseAdapter
  public database!: DataSource

  private constructor() {}

  public static getInstance(): SingletonOrmDatabaseAdapter {
    if (!SingletonOrmDatabaseAdapter.instance) {
      SingletonOrmDatabaseAdapter.instance = new SingletonOrmDatabaseAdapter()
    }

    return SingletonOrmDatabaseAdapter.instance
  }

  public async init(): Promise<void> {
    this.database = this.databaseConnection()

    if (this.database.isInitialized) {
      console.log('Database already connected')
    }
    await this.database
      .initialize()
      .then(() => {
        console.log('🚀 Connected to the database')
      })
      .catch((error) => {
        console.error('Error initialize to the database:', error)
        throw error
      })
  }

  private databaseConnection() {
    return new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test',
      synchronize: true,
      logging: false,
      entities: [Order, Item],
      migrations: [],
      subscribers: [],
    })
  }
}
