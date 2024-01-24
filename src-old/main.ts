import 'reflect-metadata'
import { FastifyAppAdapter } from '../src-old/infrastructure/adapters/fastify-adapter/fastify-app-adapter'
import { SingletonOrmDatabaseAdapter } from '../src/frameworks/database/mysql-orm-adapter'
import { Server } from '../src-old/infrastructure/server'

const main = async () => {
  const app = new FastifyAppAdapter()
  const database = SingletonOrmDatabaseAdapter.getInstance()
  const server = new Server(app, database)
  await server.start()
}

main()
