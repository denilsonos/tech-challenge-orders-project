import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
import { CreateClientUseCaseImpl } from '../../../use-cases/client/create-client-use-case'
import { CreateClientController } from '../../controllers/clients/create-client-controller'
import { createClientSwagger } from '../../../output-adapters/swagger'

export const createClientRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/client/create',
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
