import 'reflect-metadata'
import { FastifyAppAdapter } from './infrastructure/adapters/fastify-adapter/fastify-app-adapter'
import { SingletonOrmDatabaseAdapter } from './infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { Server } from './infrastructure/server'

const main = async () => {
  const app = new FastifyAppAdapter()
  const database = SingletonOrmDatabaseAdapter.getInstance()
  const server = new Server(app, database)
  await server.start()
}

main()
