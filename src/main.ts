import 'reflect-metadata'
import { FastifyAppAdapter } from '../src-old/infrastructure/adapters/fastify-adapter/fastify-app-adapter'
import { MysqlOrmAdapter } from './frameworks/database/mysql-orm-adapter'
import { Server } from '../src-old/infrastructure/server'

const main = async () => {
  const app = new FastifyAppAdapter()
  const database = MysqlOrmAdapter.getInstance()
  const server = new Server(app, database)
  await server.start()
}

main()
