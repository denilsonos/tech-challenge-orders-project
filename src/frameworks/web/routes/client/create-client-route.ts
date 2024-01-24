import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../../src/frameworks/database/mysql-orm-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
import { CreateClientUseCaseImpl } from '../../../use-cases/client/create-client-use-case'
import { CreateClientController } from '../../controllers/clients/create-client-controller'
import { createClientSwagger } from '../../../output-adapters/swagger'

export const createClientRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/clients',
    createClientSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new CreateClientUseCaseImpl(repository)
      const controller = new CreateClientController(usecase)
      await controller.execute(request, reply)
    },
  )
}
