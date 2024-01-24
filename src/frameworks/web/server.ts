import { DatabaseAdapter } from '../adapters/database-adapter'
import { AppAdapter } from '../adapters/app-adapter'
import { OrmAdapter } from '../../adapters/gateways/orm-adapter'

export class Server {
  constructor(
    private readonly app: AppAdapter,
    private readonly database: OrmAdapter,
  ) {}

  public async start(): Promise<void> {
    console.log('Starting the server...')
    await this.app.init()
    console.log('Connectiong the database...')
    await this.database.init()
  }
}
