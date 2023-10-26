import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { SingletonOrmDatabaseAdapter } from '../../../../infrastructure/adapters/orm-adapter/singleton-orm-database-adapter'
import { ClientRepositoryImpl } from '../../../output-adapters/repositories/client-repository'
import { CreateClientUseCaseImpl } from '../../../use-cases/client/create-client-use-case'
import { CreateClientController } from '../../controllers/clients/create-client-controller'

export const createClientRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/client/create',
    {
      schema: {
        tags: ['Client'],
        body: {
          type: 'object',
          properties: {
            cpf: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const orm = SingletonOrmDatabaseAdapter.getInstance()
      const repository = new ClientRepositoryImpl(orm.database)
      const usecase = new CreateClientUseCaseImpl(repository)
      const controller = new CreateClientController(usecase)
      await controller.execute(request, reply)
    },
  )
}
